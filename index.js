const express = require("express");
const articles = require("./data");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/articles", (req, res) => {
  res.status(200).json(articles);
});

app.get("/api/articles/:id", (req, res) => {
  const article = articles.find((e) => e.id === Number(req.params.id));
  res.status(200).json(article);
});

app.post("/api/articles", (req, res) => {
  const { title, body } = req.body;
  const lastId = articles[articles.length - 1].id;
  const newId = lastId + 1;

  const article = {
    id: newId,
    title: title,
    body: body,
  };

  articles.push(article);
  res.status(201).json(article);
});

app.put("/api/articles/:id", (req, res) => {
  const { title, body } = req.body;
  const indexArticle = articles.findIndex(
    (e) => e.id === Number(req.params.id)
  );
  articles[indexArticle] = {
    id: Number(req.params.id),
    title: title,
    body: body,
  };
  res.status(200).json(articles[indexArticle]);
});

app.delete("/api/articles/:id", (req, res) => {
  const indexArticle = articles.findIndex(
    (e) => e.id === Number(req.params.id)
  );

  articles.splice(indexArticle, 1);
  res.status(200).json({
    message: `Article with ID ${req.params.id} has been deleted`,
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
