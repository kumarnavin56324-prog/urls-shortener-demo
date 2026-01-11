const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const urlDB = {};

app.get("/", (req, res) => {
  res.send(`
    <h2>Free URL Shortener</h2>
    <form method="POST" action="/shorten">
      <input type="url" name="originalUrl" placeholder="Paste URL here" required />
      <button type="submit">Shorten</button>
    </form>
  `);
});

app.post("/shorten", (req, res) => {
  const originalUrl = req.body.originalUrl;
  const shortCode = Math.random().toString(36).substring(2, 7);

  urlDB[shortCode] = { originalUrl, clicks: 0 };

  res.send(`
    <p>Short URL:</p>
    <a href="/${shortCode}" target="_blank">/${shortCode}</a>
    <br><br>
    <a href="/">Back</a>
  `);
});

app.get("/:code", (req, res) => {
  const data = urlDB[req.params.code];
  if (!data) return res.send("Invalid or expired link");

  data.clicks++;
  res.redirect(data.originalUrl);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
