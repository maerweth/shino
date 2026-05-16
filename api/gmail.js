const { google } = require('googleapis');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
  });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'from:noreply@steampowered.com',
      maxResults: 1
    });

    const messages = response.data.messages;
    if (!messages || messages.length === 0) {
      return res.status(200).json({ kod: null });
    }

    const message = await gmail.users.messages.get({
      userId: 'me',
      id: messages[0].id
    });

    const body = message.data.snippet;
    const match = body.match(/\b[A-Z0-9]{5}\b/);

    if (match) {
      res.status(200).json({ kod: match[0] });
    } else {
      res.status(200).json({ kod: null });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
