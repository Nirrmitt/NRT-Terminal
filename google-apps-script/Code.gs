const OWNER_EMAIL = 'nirrmit.rtickoo@gmail.com';
const FORM_ID_KEY = 'PORTFOLIO_CONTACT_FORM_ID';
const NAME_ITEM_ID_KEY = 'PORTFOLIO_CONTACT_NAME_ITEM_ID';
const EMAIL_ITEM_ID_KEY = 'PORTFOLIO_CONTACT_EMAIL_ITEM_ID';
const MESSAGE_ITEM_ID_KEY = 'PORTFOLIO_CONTACT_MESSAGE_ITEM_ID';
const MAX_MESSAGE_LENGTH = 5000;

function setup() {
  const properties = PropertiesService.getScriptProperties();
  const existingFormId = properties.getProperty(FORM_ID_KEY);
  const existingNameItemId = properties.getProperty(NAME_ITEM_ID_KEY);
  const existingEmailItemId = properties.getProperty(EMAIL_ITEM_ID_KEY);
  const existingMessageItemId = properties.getProperty(MESSAGE_ITEM_ID_KEY);

  if (existingFormId && existingNameItemId && existingEmailItemId && existingMessageItemId) {
    const existingForm = FormApp.openById(existingFormId);
    return `Ready. Form: ${existingForm.getEditUrl()} Responses: ${existingForm.getPublishedUrl()}`;
  }

  const form = FormApp.create('Portfolio Contact Messages');
  form.setDescription('Messages sent from the portfolio contact form.');
  form.setConfirmationMessage('Thanks for reaching out. Your message has been received.');

  const nameItem = form.addTextItem().setTitle('Name').setRequired(true);
  const emailItem = form.addTextItem().setTitle('Email').setRequired(true);
  const messageItem = form.addParagraphTextItem().setTitle('Message').setRequired(true);

  const responseSheet = SpreadsheetApp.create('Portfolio Contact Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, responseSheet.getId());

  properties.setProperties({
    [FORM_ID_KEY]: form.getId(),
    [NAME_ITEM_ID_KEY]: String(nameItem.getId()),
    [EMAIL_ITEM_ID_KEY]: String(emailItem.getId()),
    [MESSAGE_ITEM_ID_KEY]: String(messageItem.getId())
  }, true);

  MailApp.getRemainingDailyQuota();
  return `Ready. Form: ${form.getEditUrl()} Responses: ${form.getPublishedUrl()} Sheet: ${responseSheet.getUrl()}`;
}

function doGet() {
  return ContentService.createTextOutput('Portfolio contact receiver is ready.');
}

function doPost(event) {
  let requestId = '';
  try {
    const fields = event && event.parameter ? event.parameter : {};
    requestId = String(fields._requestId || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64);
    if (fields._honey) return resultPage_(true, requestId);

    const name = String(fields.name || '').trim().slice(0, 120);
    const email = String(fields.email || '').trim().slice(0, 254);
    const message = String(fields.message || '').trim();
    if (!name || !isValidEmail_(email) || !message || message.length > MAX_MESSAGE_LENGTH) {
      return resultPage_(false, requestId);
    }

    const properties = PropertiesService.getScriptProperties();
    const form = FormApp.openById(properties.getProperty(FORM_ID_KEY));
    const nameItem = form.getItemById(Number(properties.getProperty(NAME_ITEM_ID_KEY))).asTextItem();
    const emailItem = form.getItemById(Number(properties.getProperty(EMAIL_ITEM_ID_KEY))).asTextItem();
    const messageItem = form.getItemById(Number(properties.getProperty(MESSAGE_ITEM_ID_KEY))).asParagraphTextItem();
    form.createResponse()
      .withItemResponse(nameItem.createResponse(name))
      .withItemResponse(emailItem.createResponse(email))
      .withItemResponse(messageItem.createResponse(message))
      .submit();

    const safeName = name.replace(/[\r\n]+/g, ' ').slice(0, 80);
    MailApp.sendEmail({
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `Portfolio message from ${safeName}`,
      body: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });
    return resultPage_(true, requestId);
  } catch (error) {
    console.error(error);
    return resultPage_(false, requestId);
  }
}

function isValidEmail_(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function resultPage_(success, requestId) {
  const payload = JSON.stringify({ type: 'portfolio-contact-result', ok: success, requestId: requestId });
  const html = `<!doctype html><html><body><script>window.top.postMessage(${payload}, '*');</script></body></html>`;
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
