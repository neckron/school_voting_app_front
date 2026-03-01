const express = require('express');
const path = require('path');
const app = express();

const distPath = path.join(__dirname, 'dist/school-voting-app-front/browser');

app.use(express.static(distPath));

// Catch-all: serve index.html for Angular client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(process.env.PORT || 8080);
