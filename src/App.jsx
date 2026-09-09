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

      <BookCard
        title="The Hobbit"
        author="J.R.R. Tolkein"      
      />

      <BookCard
        title="Pride and Prejudice"
        author="Jane Austen"      
      />
    </div>
  )
}

export default App