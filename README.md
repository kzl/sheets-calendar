# sheets-calendar

A calendar for tasks in Google Sheets that syncs with Calendar

## Setup Sheets Calendar

Open the calendar template in a web browser: [link](https://docs.google.com/spreadsheets/d/1Uae2jFOZab0qpTuythyJCJ2uhapkYYy2uhlgj0hXA60/edit?usp=sharing).

In the menu, click File > Make a copy... and save the spreadsheet to your Google Drive (you must be logged in).

From your saved copy of the spreadsheet, click Tools > Script Editor. Set the value of SPREADSHEET_ID to be equal to the value of your unique spreadsheet id. You can find this in the url, after the '/d/' and before the '/edit'. For example, in the above link, the id is '1Uae2jFOZab0qpTuythyJCJ2uhapkYYy2uhlgj0hXA60'. Set the value of TIMEZONE to your timezone (keep the same format).

From the Script Editor, click Edit > Current project's triggers. Click 'No triggers set up. Click here to add one now.' Change 'readCell' to 'createMenu' and 'Time-driven' to 'From spreadsheet'. Leave 'On open' as is. Click Save.

From the Script Editor, click Resources > Advanced Google services... and toggle 'Calendar API' to ON. Then, click on the Google API Console link. Search for 'Google Calendar API' and click 'Enable'.

At the bottom of the spreadsheet, switch to the Settings sheet and change the start date to whatever value you would like (it must be a Sunday).

Refresh the spreadsheet to enable all the changes.

## How to Use Sheets Calendar

There are four categories (rename them to whatever you wish). Under these categories, there are tasks. Each task has a day, a time, a name, and a status. When the status is 'Submitted', the task will be grayed out and struck through. If the task is overdue or due within 3 days, then it will be highlighted and bolded. Additionally, the day the task is due will be highlighted on the mini calendar to the left.

Under the General section, you may list days that will show up under the mini calendar, but they are not tasks.

To sync with your Google Calendar, from the top menu, click Calendar > Update Week/Month. Accept the required permissions. All tasks within the next week or month, respectively, will be added to your calendar. If the task was previously added to your calendar, it will not be re-added. (Technical note: tasks are uniquely identified by their cell location and name, so if either of these are changed, then the task will be re-added upon next update).

Your tasks will appear in your calendar as '\<category name\> \<task name\>'.
