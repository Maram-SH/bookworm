function BookCard(props) {
  return (
    <div>
      <p>{props.title}</p>
      <p>{props.author}</p>
      <p>{props.progress}% complete</p>

      <div
        style={{
          width: "200px",
          height: "10px",
          backgroundColor: "#ddd"
        }}>
        <div
          style={{
            width: `${props.progress}%`,
            height: "100%",
            backgroundColor: "green"
          }}
        ></div>
      </div>

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