function BookCard(props) {
  return (
    <div>
      <p>{props.title}</p>
      <p>{props.author}</p>
      <p>Currently Reading</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <h1>Welcome to Bookworm!</h1>
      <BookCard />
    </div>
  )
}

export default App