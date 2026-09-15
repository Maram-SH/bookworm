import { useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Library from "./pages/Library"

import "./App.css"

function App() {
  const [ title, setTitle ] = useState("")
  const [ author, setAuthor ] = useState("")
  const [ totalPages, setTotalPages ] = useState("")
  const [ status, setStatus ] = useState("READING")

  const [ books, setBooks ] = useState([
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
    },
    {
      id: 3,
      title: "The Cruel Prince",
      author: "Holly Black",
      progress: 0,
      totalPages: 380,
      status: "WANT_TO_READ"
    },
    {
      id: 4,
      title: "Bryony and Roses",
      author: "T. Kingfisher",
      progress: 100,
      totalPages: 160,
      status: "FINISHED"
    },
    {
      id: 5,
      title: "The Yellow House",
      author: "Sarah M. Broom",
      progress: 45,
      totalPages: 410,
      status: "DNF"
    }
  ])

  function handleProgressChange(id, newProgress) {
    setBooks(
      books.map((book) => {
        if (book.id === id) {
          return {
            ...book, 
            progress: newProgress
          }
        }

        return book
      })
    ) 
  }

  function handleStatusChange(id, newStatus) {
    setBooks(
      books.map((book) => {
        if (book.id === id) {
          return{
            ...book,
            status: newStatus,
            progress: newStatus === "FINISHED" ? 100 : book.progress
          }
        }

        return book
      })
    )
  }

  function handleAddBook(event) {
    event.preventDefault()

    if (title.trim() === "" || author.trim() === "" || totalPages <= 0) {
      alert("Please fill in all fields correctly.")
      return
    }

    const newBook = {
      id: books[books.length - 1] ? books[books.length - 1].id + 1 : 1,
      title: title.trim(),
      author: author.trim(),
      progress: status === "FINISHED" ? 100 : 0,
      totalPages: Number(totalPages),
      status: status
    }

    setBooks([...books, newBook])

    setTitle("")
    setAuthor("")
    setTotalPages("")
    setStatus("READING")
  }

  function handleDeleteBook(id) {
    setBooks(
      books.filter((book) => book.id !== id)
    )
  }

  function handleChangingPages(id, newTotalPages, currentPage) {
    if (newTotalPages < currentPage) {
      alert("Total pages can't be less than the current page.")
      return
    }

    setBooks(
      books.map((book) => {
        if (book.id === id) {
          const newProgress = Math.round(
            (currentPage / newTotalPages) * 100
          )

          return {
            ...book,
            totalPages: newTotalPages,
            progress: newProgress
          }
        }

        return book
      })
    )

    return true
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/library">Library</Link>
      </nav>

      <Routes>
        <Route 
          path="/" 
          element={<Dashboard books={books} />} 
        />
        <Route 
          path="/library" 
          element={
            <Library 
              books={books}
              onProgressChange={handleProgressChange}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteBook}
              onPagesChange={handleChangingPages}
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App