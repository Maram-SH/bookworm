import express from "express"
import cors from "cors"
import { Pool } from "pg"
import "dotenv/config"

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT)
})

const app = express();

app.use(cors())
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Bookworm API is running!")
});

app.get("/api/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books")

    const books = result.rows.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      currentPage: book.current_page,
      totalPages: book.total_pages,
      status: book.status
    }))

    res.json(books)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to fetch books" })
  }
});

app.post("/api/books", async (req, res) => {
  try {
    const totalPages = Number(req.body.totalPages)
    const currentPage = req.body.status === "FINISHED" ? totalPages : 0

    const result = await pool.query(`
      INSERT INTO books (title, author, current_page, total_pages, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`, 
      [
        req.body.title,
        req.body.author,
        currentPage,
        totalPages,
        req.body.status
      ]
    )

    const book = result.rows[0]

    res.status(201).json({
      id: book.id,
      title: book.title,
      author: book.author,
      currentPage: book.current_page,
      totalPages: book.total_pages,
      status: book.status
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to add book" })
  }
})

app.patch("/api/books/:id", async (req, res) => {
  try {
    const id = Number(req.params.id)

    const result = await pool.query(
      "SELECT * FROM books WHERE id = $1",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" })
    }

    const book = result.rows[0]

    let currentPage = book.current_page
    let totalPages = book.total_pages
    let status = book.status

    if (req.body.currentPage !== undefined) {
      currentPage = Number(req.body.currentPage)
    }

    if (req.body.totalPages !== undefined) {
      totalPages = Number(req.body.totalPages)
    }

    if (req.body.status !== undefined) {
      status = req.body.status
    }

    if (currentPage > totalPages) {
      return res.status(400).json({
        error: "Current page cannot be greater than total pages"
      })
    }

    if (status === "FINISHED") {
      currentPage = totalPages
    }

    const updatedResult = await pool.query(
      `UPDATE books
      SET current_page = $1,
      total_pages = $2,
      status = $3
      WHERE id = $4
      RETURNING *
      `,
      [
        currentPage,
        totalPages,
        status,
        id
      ]
    )

    const updatedBook = updatedResult.rows[0]

    res.json({
      id: updatedBook.id,
      title: updatedBook.title,
      author: updatedBook.author,
      currentPage: updatedBook.current_page,
      totalPages: updatedBook.total_pages,
      status: updatedBook.status
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to add book" })
  }
})

app.delete("/api/books/:id", async (req, res) => {
  try {
    const id = Number(req.params.id)

    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" })
    }

    res.json({ message: "Book deleted successfully" })
  
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to delete book" })
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});