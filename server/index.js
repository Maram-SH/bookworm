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
    currentPage: 223,
    totalPages: 310,
    status: "READING"
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    currentPage: 164,
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
    author: req.body.author,
    progress: req.body.status === "FINISHED" ? 100 : 0,
    totalPages: req.body.totalPages,
    status: req.body.status
  };

  books.push(newBook);

  res.status(201).json(newBook)
})

app.patch("/api/books/:id", (req, res) => {
  const id = Number(req.params.id)

  const book = books.find((book) => book.id === id)

  if (!book) {
    return res.status(404).json({ error: "Book not found" })
  }

  if (req.body.progress !== undefined) {
    book.progress = req.body.progress
  }

  if (req.body.status !== undefined) {
    book.status = req.body.status

    if (req.body.status === "FINISHED") {
      book.progress = 100
    }
  }

  res.json(book)
})

app.delete("/api/books/:id", (req, res) => {
  const id = Number(req.params.id)

  const bookExists = books.some((book) => book.id === id)

  if (!bookExists) {
    return res.status(404).json({ error: "Book not found" })
  }

  books = books.filter((book) => book.id !== id)

  res.json({ message: "Book deleted successfully" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});