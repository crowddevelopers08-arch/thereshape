/* ============================================================
   thereshape — Google Apps Script (SINGLE LEAD FORM)
   One landing-page form → one "thereshape Leads" tab.

   Payload shape (from app/api/leads → lib/sheets.ts):
     {
       timestamp, name, phone, area (hair concern), duration,
       branch, source, medium, campaign, pageUrl, sheetTab
     }

   SETUP
     1. Extensions → Apps Script, paste this file, Save.
     2. Run setupSheets() once (authorize when prompted) to create the tab.
     3. Deploy → New deployment → type "Web app"
          Execute as: Me
          Who has access: Anyone
        Copy the /exec URL and put it in .env as GOOGLE_SHEETS_URL.
   ============================================================ */

var LEADS_TAB = 'thereshape Leads';
var HEADERS = [
  'Timestamp', 'Name', 'Phone', 'Email', 'Hair Concern', 'Duration',
  'Branch', 'Source', 'Medium', 'Campaign', 'Page URL'
];
var COL_WIDTHS = [175, 160, 130, 200, 200, 140, 150, 150, 140, 170, 300];
var BRAND = '#22395f'; // thereshape navy

function authorize() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Authorized: ' + ss.getName());
}

function doGet() {
  return _json({ status: 'thereshape API is live' });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function _styleHeader(sheet, colCount) {
  sheet.getRange(1, 1, 1, colCount)
    .setBackground(BRAND)
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
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

function createLeadSheet(ss) {
  var s = ss.insertSheet(LEADS_TAB);
  s.appendRow(HEADERS);
  _styleHeader(s, HEADERS.length);
  COL_WIDTHS.forEach(function (w, i) { s.setColumnWidth(i + 1, w); });
  s.setRowHeight(1, 42);
  s.setFrozenRows(1);
  s.getRange(1, 1, 1, HEADERS.length).createFilter();
  return s;
}

function getOrCreateLeadSheet(ss) {
  var sheet = ss.getSheetByName(LEADS_TAB);
  if (!sheet) return createLeadSheet(ss);

  // Add Email to an existing tab without deleting or replacing old leads.
  if (sheet.getRange(1, 4).getValue() !== 'Email') {
    sheet.insertColumnAfter(3);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setColumnWidth(4, COL_WIDTHS[3]);
    _styleHeader(sheet, HEADERS.length);
  }

  return sheet;
}

function appendLeadRow(sheet, data, ts) {
  var nextRow = sheet.getLastRow() + 1;
  sheet.appendRow([
    ts,
    data.name || '',
    data.phone || '',
    data.email || '',
    data.area || '',
    data.duration || '',
    data.branch || 'Reshape Clinic',
    data.source || 'direct',
    data.medium || '',
    data.campaign || '',
    data.pageUrl || ''
  ]);
  styleRow(sheet, nextRow, HEADERS.length);
  sheet.getRange(nextRow, 3).setHorizontalAlignment('center'); // Phone
  return nextRow;
}

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ts = data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    var sheet = getOrCreateLeadSheet(ss);
    var row = appendLeadRow(sheet, data, ts);
    return _json({ success: true, tab: LEADS_TAB, row: row });
  } catch (err) {
    return _json({ error: err.toString() });
  }
}

/* ---------------------------
   RUN ONCE: create the tab
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
  Logger.log('setupSheets complete.');
}

/* ---------------------------
   TEST HELPER
---------------------------- */
function testLead() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
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
        sheetTab: 'thereshape Leads',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }
  });
  Logger.log(result.getContent());
}
