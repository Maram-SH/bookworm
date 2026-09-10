import { useState } from "react"

function BookCard(props) {
  const [progress, setProgress] = useState(props.progress)
  const [currentPage, setCurrentPage] = useState(Math.round((props.progress / 100) * props.totalPages))

  function getPercentMessage() {
    if (progress < 25) {
      return "Just started"
    } else if (progress < 50) {
      return "Getting into it"
    } else if (progress < 75) {
      return "Halfway there"
    } else if (progress < 100) {
      return "Almost finished"
    } else {
      return "Finished!"
    }
  }

  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.author}</p>

      <p>{progress}% complete</p>

      <p>{getPercentMessage()}</p>

      <div
        style={{
          width: "200px",
          height: "10px",
          backgroundColor: "#ddd"
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "green"
          }}
        ></div>
      </div>

      <input 
        type="number"
        value={currentPage}
        onChange={(event) => setCurrentPage(
          Number(event.target.value)
        )}
      />

      <span> / {props.totalPages} total pages </span>

      <button
        onClick={() => {
          const newProgress = Math.round(
            (currentPage / props.totalPages) * 100
          )

          setProgress(newProgress)
        }}
      >
        Update Progress
      </button>

      <p>Currently Reading</p>
    </div>
  )
}

function App() {
  const books = [
    {
      id: 1,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      progress: 72,
      totalPages: 310
    },
    {
      id: 2,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      progress: 38,
      totalPages: 432
    }
  ]

  return (
    <div>
      <h1>Welcome to Bookworm!</h1>

      {books.map((book) => {
        return (
          <BookCard
            key={book.id} 
            title={book.title}
            author={book.author}
            progress={book.progress}
            totalPages={book.totalPages}
          />
        )
      })}
    </div>
  )
}

export default App