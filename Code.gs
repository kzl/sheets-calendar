/* Settings */
SPREADSHEET_ID = '1Uae2jFOZab0qpTuythyJCJ2uhapkYYy2uhlgj0hXA60';
TIMEZONE = 'GMT-8:00';
NUM_CATEGORIES = 4;
COLUMN_LENGTH = 96;

/* Links to spreadsheet */
var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

/* Returns the value of a cell
   ex. (1, 2) reads the value of cell B1 */
function readCell(ssName, row, col) {
  return ss.getSheetByName(ssName).getRange(row, col).getValue();
}

/* Sets the value of a cell
   ex. (1, 2) sets the value of cell B1 */
function setCell(ssName, row, col, value) {
  ss.getSheetByName(ssName).getRange(row, col).setValue(value);
}

/* Generate an id value for a task */
function genId(catInd, rowInd, name) {
  var id = 'SCS';
  
  if (catInd < 10) {
    id += '0';
  }
  id += catInd.toString();
  
  if (rowInd < 10) {
    id += '0';
  }
  id += rowInd.toString();
  
  id += ' | ' + name;
  
  return id;
}

/* Returns all events in the primary calendar within the next (days) days */
function getCalendarEvents(days) {
  var calendarId = 'primary';
  var optionalArgs = {
    timeMin: (new Date()).toISOString(),
    timeMax: (new Date((new Date()).getTime() + days * 3600000 * 24)).toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime'
  };
  
  return Calendar.Events.list(calendarId, optionalArgs).items;
}

/* Get category name from index */
function getCatName(catInd) {
  var col = 5 * catInd + 14;
  var row = 2;
  
  return readCell('Main', row, col);
}

/* Get task from spreadsheet
   ex. (1, 2) returns information about the 3rd task in the (Green) category */
function getTask(catInd, rowInd) {
  var col = 5 * catInd + 14;
  var row = rowInd + 4;
  
  if (readCell('Main', row, col) === '') {
    return null;
  }
  
  var taskInfo = {
    date: new Date(Utilities.formatDate(readCell('Main', row, col), 'GMT', 'MMMM d, y') + ' ' + Utilities.formatDate(readCell('Main', row, col + 1), TIMEZONE, 'HH:mm:ss')),
    name: readCell('Main', row, col + 2),
    status: readCell('Main', row, col + 3)
  }
  taskInfo.id = genId(catInd, rowInd, taskInfo.name);
  
  return taskInfo;
}

/* Adds task to calendar */
function addTaskToCal(taskInfo, colorId) {
  var event = CalendarApp.getDefaultCalendar().createEvent(
    taskInfo.name,
    taskInfo.date,
    new Date(taskInfo.date.getTime() + 1),
    {description: taskInfo.id});
  if (colorId != '') {
    event.setColor(colorId);
  }
  
  return event.getId();
}

/* Updates the calendar for the next (days) days */
function updateCal(days) {
  var events = getCalendarEvents(days);
  
  var ids = {};
  for (var event in events) {
    ids[events[event].description] = 1;
  }
  
  var timeMax = new Date((new Date()).getTime() + days * 3600000 * 24);
  var colorId = readCell('Settings', 5, 3);
  
  for (var i = 0; i < NUM_CATEGORIES; i++) {
    var catName = getCatName(i);
    for (var j = 0; j < COLUMN_LENGTH; j++) {
      var task = getTask(i, j);
      if (task && task.date >= (new Date()) && task.date < timeMax && !(task.id in ids)) {
        task.name = catName + ' ' + task.name;
        addTaskToCal(task, colorId);
      }
    }
  }
}

/* Updates the calendar for the next week */
function updateWeek() {
  updateCal(7);
}

/* Updates the calendar for the next 30 days */
function updateMonth() {
  updateCal(30);
}

/* Create the menu button
   Set to trigger when the spreadsheet is opened */
function createMenu() { 
  var ui = SpreadsheetApp.getUi()
  ui.createMenu('Calendar')
  .addItem('Update Week', 'updateWeek')
  .addItem('Update Month', 'updateMonth')
  .addToUi();
}
