const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Health Status</title>
        <style>
            body { font-family:Arial; background:#0b8793; background:linear-gradient(135deg,#1e3c72,#2a5298);
                   color:white; padding:40px; text-align:center; }
            .status { background:rgba(255,255,255,0.2); padding:30px; border-radius:14px;
                      width:80%; max-width:600px; margin:auto; font-size:1.3rem; }
            a { color:white; text-decoration:none; font-weight:bold; }
        </style>
    </head>
    <body>
        <div class="status">
            <h2>💚 System Health: OK</h2>
            <p>The application is healthy and running properly.</p>
            <a href="/">← Back</a>
        </div>
    </body>
    </html>
  `);
});

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>AWS Beanstalk Demo</title>
        <style>
            body { margin:0; font-family:Arial; background:linear-gradient(135deg,#667eea,#764ba2); color:white;
                   display:flex; justify-content:center; align-items:center; height:100vh; }
            .card { background:rgba(255,255,255,0.15); padding:30px; border-radius:12px;
                    backdrop-filter:blur(10px); text-align:center; width:80%; max-width:600px; }
            h1 { margin-top:0; font-size:2.4rem; }
            a.btn { padding:12px 20px; background:white; color:#333; border-radius:8px; 
                    text-decoration:none; font-weight:bold; display:inline-block; margin-top:20px; }
            a.btn:hover { background:#e6e6e6; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🚀 AWS Elastic Beanstalk Deployment</h1>
            <p>Your Node.js application is live!</p>
            <p><strong>GitHub → GitHub Actions → AWS Elastic Beanstalk</strong></p>

            <a class="btn" href="/api/info">View API Info</a>
            <a class="btn" href="/health" style="margin-left:10px;">Health Check</a>
        </div>
    </body>
    </html>
  `);
});

app.get("/api/info", (req, res) => {
  const info = {
    app: "AWS EB Demo",
    version: "1.0.0",
    status: "running",
    time: new Date()
  };

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>API Info</title>
        <style>
            body { font-family:Arial; background:#121212; color:white; padding:40px; }
            .box { background:#1f1f1f; padding:25px; border-radius:10px; max-width:600px; margin:auto; }
            h2 { margin-top:0; }
            pre { background:#000; padding:15px; border-radius:8px; color:#0f0; }
            a { color:#4ea3ff; text-decoration:none; font-weight:bold; }
        </style>
    </head>
    <body>
        <div class="box">
            <h2>📡 Application Information</h2>
            <p>Below is your API response:</p>
            <pre>${JSON.stringify(info, null, 2)}</pre>
            <br>
            <a href="/">← Back to Home</a>
        </div>
    </body>
    </html>
  `);
});

app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>404 Not Found</title>
        <style>
            body { font-family:Arial; background:#232526; background:linear-gradient(135deg,#414345,#232526);
                   color:white; height:100vh; display:flex; justify-content:center; align-items:center; }
            .box { text-align:center; }
            h1 { font-size:4rem; margin:0; }
            p { font-size:1.3rem; }
            a { color:#4ea3ff; text-decoration:none; font-weight:bold; }
        </style>
    </head>
    <body>
        <div class="box">
            <h1>404</h1>
            <p>The route <strong>${req.originalUrl}</strong> was not found.</p>
            <a href="/">Go Home</a>
        </div>
    </body>
    </html>
  `);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    error: "Internal Server Error",
    details: err.message
  });
});

// Port for AWS EB
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});