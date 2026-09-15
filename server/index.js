import express from "express"
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());

const PORT = 3000;

let books = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    progress: 72,
    totalPages: 310,
    status: "READING"
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    progress: 38,
    totalPages: 432,
    status: "READING"
  }
]

app.get("/", (req, res) => {
  res.send("Bookworm API is running!")
});

app.get("/api/books", (req, res) => {
  res.json(books)
});

app.post("/api/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };

  books.push(newBook);

  res.status(201).json(newBook)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});