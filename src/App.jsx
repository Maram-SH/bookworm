import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Library from "./pages/Library"
import AddBook from "./pages/AddBook"

import "./App.css"

function App() {
  const [ books, setBooks ] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/books", {
      credentials: "include"
    })
    .then((response) => response.json())
    .then((data) => {
      setBooks(data)
    })
  }, [])

  function handleProgressChange(id, newCurrentPage) {
    fetch(`http://localhost:3000/api/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentPage: newCurrentPage
      })
    })
    .then((response) => response.json())
    .then((updatedBook) => {
      setBooks(
        books.map((book) => {
          if (book.id === id) {
            return updatedBook
          }

          return book
        })
      )
    })
  }

  function handleStatusChange(id, newStatus) {
    fetch(`http://localhost:3000/api/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: newStatus
      })
    })
    .then((response) => response.json())
    .then((updatedBook) => {
      setBooks(
        books.map((book) => {
          if (book.id === id) {
            return updatedBook
          }

          return book
        })
      )
    })
  }

  function handleAddBook(bookdata) {
    fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(bookdata)
    })
    .then((response) => response.json())
    .then((newBook) => {
      setBooks([...books, newBook])
    })
  }

  function handleDeleteBook(id) {
    fetch(`http://localhost:3000/api/books/${id}`, {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then(() => {
      setBooks(
        books.filter(book => book.id !== id)
      )
    })
  }

  function handleChangingPages(id, newTotalPages, currentPage) {
    if (newTotalPages < currentPage) {
      alert("Total pages can't be less than the current page.")
      return false
    }

    fetch(`http://localhost:3000/api/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        totalPages: newTotalPages
      })
    })
    .then((response) => response.json())
    .then((updatedBook) => {
      setBooks(
        books.map((book) => {
          if (book.id === id) {
            return updatedBook
          }

          return book
        })
      )
    })

    return true
  }

  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Dashboard</Link>
        <Link to="/library">Library</Link>
        <Link to="/add_book">Add Book</Link>
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
        <Route 
          path="/add_book" 
          element={<AddBook onAddBook={handleAddBook} />} 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App