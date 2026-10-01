# Portfolio contact receiver

This Apps Script creates a Google Form with a linked response spreadsheet. Submissions from the portfolio are recorded as real Form responses and emailed to `nirrmit.rtickoo@gmail.com`.

## Create and authorize the receiver

1. Open [script.google.com](https://script.google.com/) while signed in to the Google account that should own the responses.
2. Create a standalone Apps Script project and replace the starter code in `Code.gs` with the contents of this folder's `Code.gs`.
3. Select `setup` in the function menu and click **Run**. Review and approve the requested Forms, Sheets, and email permissions. The execution log contains links to the editable Google Form, its responder page, and the response spreadsheet.
4. In **Deploy > New deployment**, choose **Web app**. Set **Execute as** to your account and **Who has access** to **Anyone**, then deploy and approve the deployment prompt.
5. Copy the deployment URL ending in `/exec`.

## Connect the portfolio

In `index.html`, replace `PASTE_APPS_SCRIPT_WEB_APP_URL_HERE` in `CONTACT_RECEIVER_URL` with the deployed `/exec` URL. Keep the URL private only if you do not want public submissions; the portfolio needs it to submit messages. Deploy the updated site, send a test message, then confirm it appears in the Google Form response spreadsheet and arrives by email.

If you change `Code.gs` later, create a new web app deployment version so the live endpoint runs the updated code. The receiver validates input, uses a honeypot field, and returns a generic success/failure signal to the page; the endpoint is public and should not be used for sensitive information.
