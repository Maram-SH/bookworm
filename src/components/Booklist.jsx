import BookCard from "./BookCard";

function BookList(props) {
  return (
    <div>
      {props.books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          progress={book.progress}
          totalPages={book.totalPages}
          status={book.status}
          id={book.id}
          onProgressChange={props.onProgressChange}
          onStatusChange={props.onStatusChange}
          onDelete={props.onDelete}
          onPagesChange={props.onPagesChange}
        />
      ))}
    </div>
  )
}

export default BookList