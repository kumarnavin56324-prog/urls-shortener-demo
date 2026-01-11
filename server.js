const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

const db = {};

app.get("/", (req, res) => {
  res.send(`
    <h2>Simple URL Shortener</h2>
    <form method="POST" action="/shorten">
      <input name="url" type="url" required placeholder="Paste URL" />
      <button type="submit">Shorten</button>
    </form>
  `);
});

app.post("/shorten", (req, res) => {
  const code = Math.random().toString(36).slice(2, 7);
  db[code] = req.body.url;
  res.send(`Short URL: <a href="/${code}">/${code}</a>`);
});

app.get("/:code", (req, res) => {
  const url = db[req.params.code];
  if (!url) return res.send("Invalid link");
  res.redirect(url);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("App running on port", PORT);
});
