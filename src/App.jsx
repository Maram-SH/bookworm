function BookCard() {
  return (
    <div>
      <p>The Hobbit</p>
      <p>J.R.R. Tolkein</p>
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