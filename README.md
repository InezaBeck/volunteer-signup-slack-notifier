# Volunteer Signup → Slack Notifier

A lightweight workflow that connects a Google Form to Slack, so a coordinator never has to manually check a spreadsheet for new signups.

## What it does

1. Someone fills out a Google Form (e.g. volunteering interest, resource request, event signup).
2. Google Forms automatically logs the response as a new row in a linked Google Sheet.
3. A Google Apps Script attached to the Sheet detects the new submission and posts a formatted message to a Slack channel via an incoming webhook, so the right person is notified instantly instead of having to check the spreadsheet.

## Why

Small community organizations often run signups through a plain Google Form and then lose track of new responses because nobody's watching the spreadsheet. This closes that gap with a few lines of script and no paid tools.

## Tech

Google Forms, Google Sheets, Google Apps Script, Slack Incoming Webhooks

## Setup

1. Create a Google Form and link it to a Google Sheet (Responses tab → green Sheets icon).
2. Create a Slack incoming webhook: `api.slack.com/apps` → Create New App → From scratch → enable Incoming Webhooks → Add New Webhook to Workspace.
3. Open the linked Sheet → Extensions → Apps Script, and paste in `form-to-slack.gs`.
4. Replace `SLACK_WEBHOOK_URL` with your real webhook URL.
5. In the Apps Script editor, go to Triggers (clock icon) → Add Trigger → function `onFormSubmit`, event source "From spreadsheet," event type "On form submit."
6. Submit a test response to confirm the Slack message arrives.

## Files

- `form-to-slack.gs` — the Apps Script that watches for new form submissions and posts them to Slack.
