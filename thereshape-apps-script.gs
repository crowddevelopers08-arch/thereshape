/* ============================================================
   thereshape — Google Apps Script (FOUR FORMS, FOUR TABS)

   Routes:
     /api/leads     -> { formType:'lead', sheetTab, timestamp, name, phone,
                         email, area (hair concern), duration, branch,
                         source, medium, campaign, pageUrl }
                       Guided assessment submissions instead send
                       { formType, sheetTab, timestamp, name, phone, email,
                         location, primaryConcern, hairLossDuration,
                         hairLossArea, familyHistory, branch, source, medium,
                         campaign, pageUrl, formSource } and land in their own
                       tab, one per page:
                         formType 'hairscan'    -> 'thereshape Hair Scan'
                           (/hair-scan, hair-scan-component/ChatBooking.tsx)
                         formType 'scan'        -> 'thereshape Scan'
                           (/scan, scan/BookingModal.tsx)
                         formType 'hairtrinity' -> 'thereshape Hairtrinity'
                           (/hairtrinity, hairtrinity/ChatBooking.tsx)
                       All three tabs share one column layout because all
                       three forms ask the same questions.
     /api/feedback  -> { formType:'feedback', sheetTab, timestamp, name, email,
                         phone, rating, suggestions, source, pageUrl }

   The review funnel at /review sends 4–5 stars to Google; 1–3 is routed to
   /client-feedback?rating=N, which is why Feedback rows carry a Rating column.

   Routing is on `formType`. If it is missing the script sniffs the payload
   (`suggestions` is unique to the feedback form, `hairLossArea` to the
   guided-assessment forms, `formSource` disambiguates which one) and
   otherwise falls back to Leads — so an older deploy of the site still
   lands in the right tab.

   SETUP
     1. Extensions → Apps Script, paste this file, Save.
     2. Run setupSheets() once (authorize when prompted) to create all tabs.
     3. Deploy → New deployment → type "Web app"
          Execute as: Me
          Who has access: Anyone
        Copy the /exec URL and put it in .env as GOOGLE_SHEETS_URL.

     Already deployed? Paste over the old script, run setupSheets() again
     (it only adds what is missing), then Deploy → Manage deployments →
     edit the existing one → New version. The /exec URL stays the same.
   ============================================================ */

/* ── Tab names — must match the exported tab names in lib/sheets.ts ── */
var LEADS_TAB       = 'thereshape Leads';
var FEEDBACK_TAB    = 'thereshape Feedback';
var HAIR_SCAN_TAB   = 'thereshape Hair Scan';
var SCAN_TAB        = 'thereshape Scan';
var HAIRTRINITY_TAB = 'thereshape Hairtrinity';

var LEADS_HEADERS = [
  'Timestamp', 'Name', 'Phone', 'Email', 'Hair Concern', 'Duration',
  'Branch', 'Source', 'Medium', 'Campaign', 'Page URL'
];
var LEADS_WIDTHS = [175, 160, 130, 200, 200, 140, 150, 150, 140, 170, 300];

var FEEDBACK_HEADERS = [
  'Timestamp', 'Name', 'Phone', 'Email', 'Rating', 'Suggestions', 'Source', 'Page URL'
];
var FEEDBACK_WIDTHS = [175, 160, 130, 210, 80, 440, 210, 300];

// Every field the guided assessment flows collect — including the two
// (Most Noticeable Area, Family History) that used to be dropped entirely.
// /hair-scan, /scan and /hairtrinity each get their own tab but ask the same
// questions, so they share one column layout. Form Source still records which
// form captured the lead: it is what identifies a row that reached the wrong
// tab through the payload-sniffing fallback in doPost.
var HAIR_SCAN_HEADERS = [
  'Timestamp', 'Name', 'Phone', 'Email', 'Location', 'Primary Concern',
  'Hair Loss Duration', 'Most Noticeable Area', 'Family History',
  'Branch', 'Source', 'Medium', 'Campaign', 'Page URL', 'Form Source'
];
var HAIR_SCAN_WIDTHS = [175, 160, 130, 200, 160, 190, 160, 180, 130, 150, 150, 140, 170, 300, 150];

// The Scan and Hairtrinity tabs are deliberately the same shape — one
// appender serves all three.
var SCAN_HEADERS = HAIR_SCAN_HEADERS;
var SCAN_WIDTHS  = HAIR_SCAN_WIDTHS;
var HAIRTRINITY_HEADERS = HAIR_SCAN_HEADERS;
var HAIRTRINITY_WIDTHS  = HAIR_SCAN_WIDTHS;

var BRAND       = '#22395f'; // thereshape navy — Leads header
var PEACH       = '#b4632f'; // deepened peach, readable behind white text — Feedback header
var TEAL        = '#0f766e'; // hair-scan teal — Hair Scan header
var VIOLET      = '#5b4b8a'; // muted violet — Scan header
var HAIRTRINITY_COLOR = '#b45309'; // amber — Hairtrinity header

function authorize() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Authorized: ' + ss.getName());
}

function doGet() {
  return _json({ status: 'thereshape API is live', tabs: [LEADS_TAB, FEEDBACK_TAB, HAIR_SCAN_TAB, SCAN_TAB, HAIRTRINITY_TAB] });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function _styleHeader(sheet, colCount, colour) {
  sheet.getRange(1, 1, 1, colCount)
    .setBackground(colour || BRAND)
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
}

function _applyWidths(sheet, widths) {
  widths.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });
}

function styleRow(sheet, rowIndex, colCount) {
  var row = sheet.getRange(rowIndex, 1, 1, colCount);
  row.setBackground(rowIndex % 2 === 0 ? '#fbf8f5' : '#ffffff')
    .setFontColor('#1f2f47')
    .setFontSize(10)
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left');
  sheet.setRowHeight(rowIndex, 36);
  row.setBorder(false, false, true, false, false, false, '#e7ecf3', SpreadsheetApp.BorderStyle.SOLID);
}

/* ── Sheet creators ─────────────────────────────────────────────────────── */

function createLeadSheet(ss) {
  var s = ss.insertSheet(LEADS_TAB);
  s.appendRow(LEADS_HEADERS);
  _styleHeader(s, LEADS_HEADERS.length, BRAND);
  _applyWidths(s, LEADS_WIDTHS);
  s.setRowHeight(1, 42);
  s.setFrozenRows(1);
  s.getRange(1, 1, 1, LEADS_HEADERS.length).createFilter();
  return s;
}

function getOrCreateLeadSheet(ss) {
  var sheet = ss.getSheetByName(LEADS_TAB);
  if (!sheet) return createLeadSheet(ss);

  // Add Email to an existing tab without deleting or replacing old leads.
  if (sheet.getRange(1, 4).getValue() !== 'Email') {
    sheet.insertColumnAfter(3);
    sheet.getRange(1, 1, 1, LEADS_HEADERS.length).setValues([LEADS_HEADERS]);
    sheet.setColumnWidth(4, LEADS_WIDTHS[3]);
    _styleHeader(sheet, LEADS_HEADERS.length, BRAND);
  }

  return sheet;
}

function createFeedbackSheet(ss) {
  var s = ss.insertSheet(FEEDBACK_TAB);
  s.appendRow(FEEDBACK_HEADERS);
  _styleHeader(s, FEEDBACK_HEADERS.length, PEACH);
  _applyWidths(s, FEEDBACK_WIDTHS);
  s.setRowHeight(1, 42);
  s.setFrozenRows(1);
  s.getRange(1, 1, 1, FEEDBACK_HEADERS.length).createFilter();
  return s;
}

function getOrCreateFeedbackSheet(ss) {
  return ss.getSheetByName(FEEDBACK_TAB) || createFeedbackSheet(ss);
}

/* The Hair Scan and Scan tabs are identical apart from name and header colour,
   so one pair of helpers builds and maintains both. */

function _createAssessmentSheet(ss, tabName, colour) {
  var s = ss.insertSheet(tabName);
  s.appendRow(HAIR_SCAN_HEADERS);
  _styleHeader(s, HAIR_SCAN_HEADERS.length, colour);
  _applyWidths(s, HAIR_SCAN_WIDTHS);
  s.setRowHeight(1, 42);
  s.setFrozenRows(1);
  s.getRange(1, 1, 1, HAIR_SCAN_HEADERS.length).createFilter();
  return s;
}

function _getOrCreateAssessmentSheet(ss, tabName, colour) {
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) return _createAssessmentSheet(ss, tabName, colour);

  // Add Form Source to an existing tab without deleting or replacing old rows.
  // It is appended as the last column rather than inserted, so every value
  // already in the sheet stays in the column it was written to.
  var lastCol = HAIR_SCAN_HEADERS.length;
  if (sheet.getRange(1, lastCol).getValue() !== 'Form Source') {
    if (sheet.getMaxColumns() < lastCol) {
      sheet.insertColumnsAfter(sheet.getMaxColumns(), lastCol - sheet.getMaxColumns());
    }
    sheet.getRange(1, 1, 1, lastCol).setValues([HAIR_SCAN_HEADERS]);
    sheet.setColumnWidth(lastCol, HAIR_SCAN_WIDTHS[lastCol - 1]);
    _styleHeader(sheet, lastCol, colour);
  }

  return sheet;
}

function createHairScanSheet(ss) {
  return _createAssessmentSheet(ss, HAIR_SCAN_TAB, TEAL);
}

function getOrCreateHairScanSheet(ss) {
  return _getOrCreateAssessmentSheet(ss, HAIR_SCAN_TAB, TEAL);
}

function createScanSheet(ss) {
  return _createAssessmentSheet(ss, SCAN_TAB, VIOLET);
}

function getOrCreateScanSheet(ss) {
  return _getOrCreateAssessmentSheet(ss, SCAN_TAB, VIOLET);
}

function createHairtrinitySheet(ss) {
  return _createAssessmentSheet(ss, HAIRTRINITY_TAB, HAIRTRINITY_COLOR);
}

function getOrCreateHairtrinitySheet(ss) {
  return _getOrCreateAssessmentSheet(ss, HAIRTRINITY_TAB, HAIRTRINITY_COLOR);
}

/* ── Row appenders ──────────────────────────────────────────────────────── */

function appendLeadRow(sheet, data, ts) {
  var nextRow = sheet.getLastRow() + 1;
  sheet.appendRow([
    ts,
    data.name || '',
    data.phone || '',
    data.email || '',
    data.area || data.concern || '',
    data.duration || '',
    data.branch || 'Reshape Clinic',
    data.source || 'direct',
    data.medium || '',
    data.campaign || '',
    data.pageUrl || ''
  ]);
  styleRow(sheet, nextRow, LEADS_HEADERS.length);
  sheet.getRange(nextRow, 3).setHorizontalAlignment('center'); // Phone
  return nextRow;
}

function appendHairScanRow(sheet, data, ts) {
  var nextRow = sheet.getLastRow() + 1;
  sheet.appendRow([
    ts,
    data.name || '',
    data.phone || '',
    data.email || '',
    data.location || '',
    data.primaryConcern || data.area || '',
    data.hairLossDuration || data.duration || '',
    data.hairLossArea || '',
    data.familyHistory || '',
    data.branch || 'Reshape Clinic',
    data.source || 'direct',
    data.medium || '',
    data.campaign || '',
    data.pageUrl || '',
    data.formSource || ''
  ]);
  styleRow(sheet, nextRow, HAIR_SCAN_HEADERS.length);
  sheet.getRange(nextRow, 3).setHorizontalAlignment('center'); // Phone
  return nextRow;
}

function appendFeedbackRow(sheet, data, ts, source) {
  var nextRow = sheet.getLastRow() + 1;
  sheet.appendRow([
    ts,
    data.name || '',
    data.phone || '',
    data.email || '',
    data.rating || '',        // 1–5 from /review, blank if they skipped it
    data.suggestions || '',
    source,
    data.pageUrl || ''
  ]);
  styleRow(sheet, nextRow, FEEDBACK_HEADERS.length);
  sheet.getRange(nextRow, 3).setHorizontalAlignment('center');          // Phone
  sheet.getRange(nextRow, 5).setHorizontalAlignment('center');          // Rating
  sheet.getRange(nextRow, 6).setWrap(true).setVerticalAlignment('top'); // Suggestions
  return nextRow;
}

/* ── doPost — runs on every submission. Appends ONE row, touches nothing else. */

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ts = data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // `formType` is authoritative. The fallbacks below cover a POST made
    // without it: `suggestions` is unique to the feedback form, `hairLossArea`
    // to the guided assessment forms.
    //
    // Scan is tested FIRST and excluded from the hair-scan test below, because
    // a /scan payload also carries `hairLossArea` — the two forms ask the same
    // questions. Sniffing for hair-scan first would swallow every scan lead.
    var isScan =
      String(data.formType || '').toLowerCase() === 'scan' ||
      String(data.formSource || '').toLowerCase() === 'scan popup' ||
      (data.sheetTab && String(data.sheetTab).toLowerCase() === SCAN_TAB.toLowerCase());

    // Check Hairtrinity first: its guided form also carries hairLossArea.
    var isHairtrinity =
      !isScan &&
      (String(data.formType || '').toLowerCase() === 'hairtrinity' ||
        String(data.formSource || '').toLowerCase() === 'hairtrinity-leads' ||
        String(data.formSource || '').toLowerCase() === 'hair trinity form' ||
        (data.sheetTab && String(data.sheetTab).toLowerCase() === HAIRTRINITY_TAB.toLowerCase()));

    var isHairScan =
      !isScan &&
      !isHairtrinity &&
      (String(data.formType || '').toLowerCase() === 'hairscan' ||
        !!data.hairLossArea ||
        (data.sheetTab && String(data.sheetTab).toLowerCase().indexOf('hair scan') !== -1));

    var isFeedback =
      !isScan &&
      !isHairtrinity &&
      !isHairScan &&
      (String(data.formType || '').toLowerCase() === 'feedback' ||
        !!data.suggestions ||
        (data.sheetTab && String(data.sheetTab).toLowerCase().indexOf('feedback') !== -1) ||
        (data.source && String(data.source).toLowerCase().indexOf('feedback') !== -1));

    if (isScan) {
      var scanSheet = getOrCreateScanSheet(ss);
      var scanRow = appendHairScanRow(scanSheet, data, ts);
      return _json({ success: true, tab: SCAN_TAB, row: scanRow });
    }

    if (isHairtrinity) {
      var hairtrinitySheet = getOrCreateHairtrinitySheet(ss);
      var hairtrinityRow = appendHairScanRow(hairtrinitySheet, data, ts);
      return _json({ success: true, tab: HAIRTRINITY_TAB, row: hairtrinityRow });
    }

    if (isHairScan) {
      var hsSheet = getOrCreateHairScanSheet(ss);
      var hsRow = appendHairScanRow(hsSheet, data, ts);
      return _json({ success: true, tab: HAIR_SCAN_TAB, row: hsRow });
    }

    if (isFeedback) {
      var fbSheet = getOrCreateFeedbackSheet(ss);
      var fbSource = data.source || data.pageUrl || 'thereshape — Client Feedback';
      var fbRow = appendFeedbackRow(fbSheet, data, ts, fbSource);
      return _json({ success: true, tab: FEEDBACK_TAB, row: fbRow });
    }

    var sheet = getOrCreateLeadSheet(ss);
    var row = appendLeadRow(sheet, data, ts);
    return _json({ success: true, tab: LEADS_TAB, row: row });
  } catch (err) {
    return _json({ error: err.toString() });
  }
}

/* ---------------------------
   RUN ONCE: create the tabs
---------------------------- */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss.getSheetByName(LEADS_TAB)) {
    createLeadSheet(ss);
    Logger.log('Created: ' + LEADS_TAB);
  } else {
    getOrCreateLeadSheet(ss);
    Logger.log('OK: ' + LEADS_TAB);
  }

  if (!ss.getSheetByName(FEEDBACK_TAB)) {
    createFeedbackSheet(ss);
    Logger.log('Created: ' + FEEDBACK_TAB);
  } else {
    Logger.log('OK: ' + FEEDBACK_TAB);
  }

  if (!ss.getSheetByName(HAIR_SCAN_TAB)) {
    createHairScanSheet(ss);
    Logger.log('Created: ' + HAIR_SCAN_TAB);
  } else {
    getOrCreateHairScanSheet(ss); // adds Form Source if this tab predates it
    Logger.log('OK: ' + HAIR_SCAN_TAB);
  }

  if (!ss.getSheetByName(SCAN_TAB)) {
    createScanSheet(ss);
    Logger.log('Created: ' + SCAN_TAB);
  } else {
    getOrCreateScanSheet(ss);
    Logger.log('OK: ' + SCAN_TAB);
  }

  if (!ss.getSheetByName(HAIRTRINITY_TAB)) {
    createHairtrinitySheet(ss);
    Logger.log('Created: ' + HAIRTRINITY_TAB);
  } else {
    getOrCreateHairtrinitySheet(ss);
    Logger.log('OK: ' + HAIRTRINITY_TAB);
  }

  Logger.log('setupSheets complete.');
}

/* ---------------------------
   TEST HELPERS
---------------------------- */
function testLead() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
        formType: 'lead',
        sheetTab: LEADS_TAB,
        name: 'Test Lead',
        phone: '9876543210',
        email: 'test@example.com',
        area: 'Hair Loss / Hair Fall',
        duration: '3 to 12 months',
        branch: 'Reshape Clinic',
        source: 'google',
        medium: 'cpc',
        campaign: 'hair-trinity',
        pageUrl: 'https://thereshape.in/',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }
  });
  Logger.log(result.getContent());
}

function testHairScanLead() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
        formType: 'hairscan',
        sheetTab: HAIR_SCAN_TAB,
        name: 'Test Hair Scan Lead',
        phone: '9876543210',
        email: 'test.hairscan@example.com',
        location: 'Chennai',
        primaryConcern: 'Hair thinning',
        hairLossDuration: '3–6 months',
        hairLossArea: 'Crown area',
        familyHistory: 'Yes',
        branch: 'Reshape Clinic',
        source: 'direct',
        medium: '',
        campaign: '',
        pageUrl: 'https://thereshape.in/hair-scan',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }
  });
  Logger.log(result.getContent());
}

function testScanLead() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
        formType: 'scan',
        sheetTab: SCAN_TAB,
        name: 'Test Scan Lead',
        phone: '9876543210',
        email: 'test.scan@example.com',
        location: 'Coimbatore',
        primaryConcern: 'Receding hairline',
        hairLossDuration: 'More than 1 year',
        hairLossArea: 'Front hairline',
        familyHistory: 'Yes',
        branch: 'Reshape Clinic',
        source: 'direct',
        medium: '',
        campaign: '',
        pageUrl: 'https://thereshape.in/scan',
        formSource: 'Scan Popup',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }
  });
  Logger.log(result.getContent()); // expect tab: 'thereshape Scan'
}

/** Guards the routing order: a scan payload carries `hairLossArea` too, so
 *  without formType it must still be recognised by formSource, not swallowed
 *  by the hair-scan sniff. Expect tab: 'thereshape Scan'. */
function testScanWithoutFormType() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Fallback Scan Lead',
        phone: '9876543210',
        email: 'fallback.scan@example.com',
        hairLossArea: 'Crown area',
        formSource: 'Scan Popup',
        pageUrl: 'https://thereshape.in/scan'
      })
    }
  });
  Logger.log(result.getContent());
}

function testHairtrinityLead() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
        formType: 'hairtrinity',
        sheetTab: HAIRTRINITY_TAB,
        name: 'Test Hair Trinity Lead',
        phone: '9876543210',
        email: 'test.hairtrinity@example.com',
        location: 'Chennai',
        primaryConcern: 'Hair thinning',
        hairLossDuration: '3-6 months',
        hairLossArea: 'Crown area',
        familyHistory: 'Yes',
        branch: 'Reshape Clinic',
        source: 'direct',
        medium: '',
        campaign: 'hair-trinity',
        pageUrl: 'https://thereshape.in/hairtrinity',
        formSource: 'hairtrinity-leads',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }
  });
  Logger.log(result.getContent()); // expect tab: 'thereshape Hairtrinity'
}

function testFeedback() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
        formType: 'feedback',
        sheetTab: FEEDBACK_TAB,
        name: 'Test Feedback',
        phone: '9876543210',
        email: 'test.feedback@example.com',
        rating: 2,
        suggestions: 'Waiting time at the clinic was longer than expected.',
        source: 'thereshape — Client Feedback',
        pageUrl: 'https://thereshape.in/client-feedback',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }
  });
  Logger.log(result.getContent());
}

/** Proves the fallback: no formType, but `suggestions` still routes it right. */
function testFeedbackWithoutFormType() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Fallback Feedback',
        phone: '9876543210',
        email: 'fallback@example.com',
        suggestions: 'Posted without formType — should still land in the Feedback tab.'
      })
    }
  });
  Logger.log(result.getContent());
}
