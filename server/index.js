import express from "express"
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Bookworm API is running!")
});

app.get("/api/books", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Pride and Prejudice",
      author: "Jane Austen"
    },
    {
      id: 2,
      title: "The Hobbit",
      author: "J.R.R. Tolkien"
    }
  ])
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});