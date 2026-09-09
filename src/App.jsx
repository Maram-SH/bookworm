import { useState } from "react"

function BookCard(props) {
  const [progress, setProgress] = useState(props.progress)

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

      <button onClick={() => setProgress(progress + 1)}>
        +1%
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
      />

      <BookCard
        title="Pride and Prejudice"
        author="Jane Austen"
        progress={38}  
      />
    </div>
  )
}

export default App