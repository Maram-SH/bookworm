import { useState } from "react"

function BookCard(props) {
  const [currentPage, setCurrentPage] = useState(Math.round((props.progress / 100) * props.totalPages))

  function getPercentMessage() {
    if (props.progress < 25) {
      return "Just started"
    } else if (props.progress < 50) {
      return "Getting into it"
    } else if (props.progress < 75) {
      return "Halfway there"
    } else if (props.progress < 100) {
      return "Almost finished"
    } else {
      return "Finished!"
    }
  }

  function getStatusMessage() {
    if (props.status === "READING") {
      return "Currently Reading"
    } else if (props.status === "WANT_TO_READ") {
      return "Want To Read"
    } else if (props.status === "FINISHED") {
      return "Finished"
    } else if (props.status === "DNF") {
      return "Did Not Finish"
    } else {
      return "ERROR"
    }
  }

  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.author}</p>

      {(props.status === "READING" || props.status === "FINISHED" || props.status === "DNF") && (
        <div>
          <p>{props.progress}% complete</p>

          {props.status == "READING" && (
            <p>{getPercentMessage()}</p>
          )}

          <div
            style={{
              width: "200px",
              height: "10px",
              backgroundColor: "#ddd"
            }}
          >
            <div
              style={{
                width: `${props.progress}%`,
                height: "100%",
                backgroundColor: "green"
              }}
            ></div>
          </div>

          {props.status === "READING" && (
            <div>
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

                  props.onProgressChange(props.id, newProgress)
                }}
              >
                Update Progress
              </button>
            </div>
          )}
        </div>
      )}

      <p>{getStatusMessage()}</p>

      <select 
        value={props.status} 
        onChange={(event) => {
          props.onStatusChange(props.id, event.target.value)
        }}
      >
        <option value="WANT_TO_READ">Want To Read</option>
        <option value="READING">Reading</option>
        <option value="FINISHED">Finished</option>
        <option value="DNF">Did Not Finish</option>
      </select>
    </div>
  )
}

function App() {
  const [ title, setTitle ] = useState("")
  const [ author, setAuthor ] = useState("")

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

  function handleAddBook() {
    if (title === "" || author === "") {
      alert(`Title is ${title} and author is ${author}`)
    } else {
      alert("Please fill in the missing field(s).")
    }
  }

  return (
    <div>
      <h1>Welcome to Bookworm!</h1>

      <h2>Currently reading: {books.length} {books.length === 1 ? "book" : "books"}</h2>

      <form onSubmit={(event) => {event.preventDefault()}}>
        <input type="text" placeholder="Book title" onChange={(event) => setTitle(event.target.value)} />
        <input type="text" placeholder="Author" onChange={(event) => setAuthor(event.target.value)}  />

        <button type="submit" onClick={() => {handleAddBook()}}>Add book</button>
      </form>

      {books.map((book) => {
        return (
          <BookCard
            key={book.id} 
            title={book.title}
            author={book.author}
            progress={book.progress}
            totalPages={book.totalPages}
            status={book.status}
            onProgressChange={handleProgressChange}
            onStatusChange={handleStatusChange}
            id={book.id}
          />
        )
      })}
    </div>
  )
}

export default App