import { useState } from "react"

function BookCard(props) {
  const [progress, setProgress] = useState(props.progress)
  const [currentPage, setCurrentPage] = useState(Math.round((props.progress / 100) * props.totalPages))

  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.author}</p>

      <p>{progress}% complete</p>

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
  return (
    <div>
      <h1>Welcome to Bookworm!</h1>

      <BookCard
        title="The Hobbit"
        author="J.R.R. Tolkein"
        progress={72}
        totalPages={310}
      />

      <BookCard
        title="Pride and Prejudice"
        author="Jane Austen"
        progress={38}
        totalPages={432} 
      />
    </div>
  )
}

export default App