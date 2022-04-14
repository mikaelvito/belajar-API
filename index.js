const express = require("express");
const articles = require("./data");

const app = express();
const port = 3000;

app.get("/api/articles", (req, res) => {
  res.status(200).json(articles);
});

app.get("/api/articles/:id", (req, res) => {
  const article = articles.find((e) => e.id === Number(req.params.id));
  res.status(200).json(article);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
