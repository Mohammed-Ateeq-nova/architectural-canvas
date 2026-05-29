import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
  credentials: true
}));
app.use(express.json());

// Formatted HTML template helper
function generateFormattedEmail(name, email, message) {
  const dateStr = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Portfolio Contact Form Submission</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #050505;
          color: #e5e5e5;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #0c0c0c;
          border: 1px solid #1a1a1a;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 229, 255, 0.05);
        }
        .header {
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
          padding: 30px;
          border-bottom: 2px solid #00e5ff;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
        }
        .header p {
          margin: 10px 0 0;
          font-size: 13px;
          color: #00e5ff;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }
        .content {
          padding: 30px;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 25px;
        }
        .meta-box {
          background-color: #121212;
          border: 1px solid #222;
          border-radius: 8px;
          padding: 12px 15px;
        }
        .meta-label {
          font-size: 11px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .meta-value {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
        }
        .message-box {
          background-color: #121212;
          border: 1px solid #222;
          border-left: 3px solid #00e5ff;
          border-radius: 4px 8px 8px 4px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .message-text {
          font-size: 15px;
          line-height: 1.6;
          color: #d1d1d1;
          white-space: pre-wrap;
          margin: 0;
        }
        .footer {
          background-color: #080808;
          padding: 20px;
          border-top: 1px solid #111;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .footer a {
          color: #00e5ff;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>PORTFOLIO TRANSMISSION</h1>
          <p>New Contact Form Submission</p>
        </div>
        <div class="content">
          <div class="meta-grid">
            <div class="meta-box">
              <div class="meta-label">Sender Name</div>
              <div class="meta-value">${name}</div>
            </div>
            <div class="meta-box">
              <div class="meta-label">Email Address</div>
              <div class="meta-value">${email}</div>
            </div>
          </div>
          
          <div class="meta-box" style="margin-bottom: 25px; grid-template-columns: 1fr;">
            <div class="meta-label">Received Timestamp (IST)</div>
            <div class="meta-value">${dateStr}</div>
          </div>

          <div class="meta-label" style="margin-bottom: 8px;">Message Content</div>
          <div class="message-box">
            <pre class="message-text">${message}</pre>
          </div>
        </div>
        <div class="footer">
          Received via Portfolio Contact System • <a href="mailto:${email}">Reply to Sender</a>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Contact API endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields (name, email, message) are required.'
    });
  }

  try {
    const apiKey = process.env.MAILING_SERVICE_API_KEY;
    if (!apiKey) {
      console.error('Mailing service error: MAILING_SERVICE_API_KEY is not configured in .env');
      return res.status(500).json({
        success: false,
        message: 'Mailing service credentials not configured. Please supply MAILING_SERVICE_API_KEY in server environment.'
      });
    }
    const recipient = process.env.SMTP_TO || 'mohd.ateeq.march@gmail.com';
    const htmlContent = generateFormattedEmail(name, email, message);

    console.log(`Forwarding contact message from ${name} to Qwerty Mailing Service...`);

    const response = await fetch('https://qwertymailingservice.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        to: [recipient],
        subject: `💼 Portfolio Contact from ${name}`,
        html: htmlContent,
        replyTo: email
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Message sent successfully via Qwerty Mailing Service:', data);
      res.status(200).json({
        success: true,
        message: 'Email dispatched successfully.',
        data
      });
    } else {
      console.error('Mailing service returned error:', data);
      res.status(response.status).json({
        success: false,
        message: data.message || 'Failed to dispatch email via mailing service.'
      });
    }
  } catch (error) {
    console.error('Mailing service communication failure:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to communicate with the mailing service.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Contact Form server listening on port ${PORT}`);
  console.log(`💻 Ready to receive portfolio API transmissions`);
  console.log(`==================================================`);
});
