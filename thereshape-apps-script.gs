/* ============================================================
   thereshape — Google Apps Script (TWO FORMS, TWO TABS)

   Routes:
     /api/leads     -> { formType:'lead', sheetTab, timestamp, name, phone,
                         email, area (hair concern), duration, branch,
                         source, medium, campaign, pageUrl }
     /api/feedback  -> { formType:'feedback', sheetTab, timestamp, name, email,
                         phone, rating, suggestions, source, pageUrl }

   The review funnel at /review sends 4–5 stars to Google; 1–3 is routed to
   /client-feedback?rating=N, which is why Feedback rows carry a Rating column.

   Routing is on `formType`. If it is missing the script sniffs the payload
   (`suggestions` is unique to the feedback form) and otherwise falls back to
   Leads — so an older deploy of the site still lands in the right tab.

   SETUP
     1. Extensions → Apps Script, paste this file, Save.
     2. Run setupSheets() once (authorize when prompted) to create both tabs.
     3. Deploy → New deployment → type "Web app"
          Execute as: Me
          Who has access: Anyone
        Copy the /exec URL and put it in .env as GOOGLE_SHEETS_URL.

     Already deployed? Paste over the old script, run setupSheets() again
     (it only adds what is missing), then Deploy → Manage deployments →
     edit the existing one → New version. The /exec URL stays the same.
   ============================================================ */

/* ── Tab names — must match LEADS_TAB / FEEDBACK_TAB in lib/sheets.ts ────── */
var LEADS_TAB    = 'thereshape Leads';
var FEEDBACK_TAB = 'thereshape Feedback';

var LEADS_HEADERS = [
  'Timestamp', 'Name', 'Phone', 'Email', 'Hair Concern', 'Duration',
  'Branch', 'Source', 'Medium', 'Campaign', 'Page URL'
];
var LEADS_WIDTHS = [175, 160, 130, 200, 200, 140, 150, 150, 140, 170, 300];

var FEEDBACK_HEADERS = [
  'Timestamp', 'Name', 'Phone', 'Email', 'Rating', 'Suggestions', 'Source', 'Page URL'
];
var FEEDBACK_WIDTHS = [175, 160, 130, 210, 80, 440, 210, 300];

var BRAND = '#22395f'; // thereshape navy — Leads header
var PEACH = '#b4632f'; // deepened peach, readable behind white text — Feedback header

function authorize() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Authorized: ' + ss.getName());
}

function doGet() {
  return _json({ status: 'thereshape API is live', tabs: [LEADS_TAB, FEEDBACK_TAB] });
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
    // without it: `suggestions` is unique to the feedback form.
    var isFeedback =
      String(data.formType || '').toLowerCase() === 'feedback' ||
      !!data.suggestions ||
      (data.sheetTab && String(data.sheetTab).toLowerCase().indexOf('feedback') !== -1) ||
      (data.source && String(data.source).toLowerCase().indexOf('feedback') !== -1);

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
