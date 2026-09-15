import BookList from "../components/Booklist"

function Library(props) {
  return (
    <div>
      <h1>Library</h1>

      {props.books.length === 0 ? 
        (
          <p>Your library is empty. Head to Add Book to fill your library.</p>
        ) : 
        (<BookList
          books={props.books}
          onProgressChange={props.onProgressChange}
          onStatusChange={props.onStatusChange}
          onDelete={props.onDelete}
          onPagesChange={props.onPagesChange}
        />)
      }
    </div>
  )
}

export default Library