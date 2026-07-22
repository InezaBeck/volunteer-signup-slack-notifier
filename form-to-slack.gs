/**
 * Volunteer/Resource Interest Form → Slack Notification
 *
 * SETUP:
 * 1. Open the Google Sheet linked to your Form's responses.
 * 2. Extensions → Apps Script.
 * 3. Delete any starter code, paste this in.
 * 4. Replace SLACK_WEBHOOK_URL below with your real webhook URL.
 * 5. Click the clock icon (Triggers) in the left sidebar → Add Trigger:
 *      - Function: onFormSubmit
 *      - Event source: From spreadsheet
 *      - Event type: On form submit
 * 6. Save. Submit a test response to your Form to confirm it posts to Slack.
 */

const SLACK_WEBHOOK_URL = "PASTE_YOUR_SLACK_WEBHOOK_URL_HERE";

function onFormSubmit(e) {
  // e.namedValues is an object like { "Name": ["Jane Doe"], "Email": ["jane@example.com"], ... }
  const values = e.namedValues;

  // Build a readable summary from whatever fields the form actually has
  let summaryLines = [];
  for (const question in values) {
    const answer = values[question][0] || "(no answer)";
    summaryLines.push(`*${question}:* ${answer}`);
  }
  const summary = summaryLines.join("\n");

  const payload = {
    text: `:tada: New signup received!\n${summary}`
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };

  try {
    UrlFetchApp.fetch(SLACK_WEBHOOK_URL, options);
  } catch (err) {
    // Log errors to the Apps Script execution log for debugging
    console.error("Slack notification failed: " + err);
  }
}
