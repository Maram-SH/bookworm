import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Library from "./pages/Library"
import AddBook from "./pages/AddBook"

import "./App.css"

function App() {
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

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
    .then((response) => response.json())
    .then((data) => {
      setBooks(data)
    })
  }, [])

  function handleProgressChange(id, newProgress) {
    fetch(`http://localhost:3000/api/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        progress: newProgress
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
      console.log("NEW BOOK FROM SERVER:", newBook)
      setBooks([...books, newBook])
    })
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