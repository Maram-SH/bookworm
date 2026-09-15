import { useState } from "react"

function AddBook(props) {
  const [ title, setTitle ] = useState("")
  const [ author, setAuthor ] = useState("")
  const [ totalPages, setTotalPages ] = useState("")
  const [ status, setStatus ] = useState("READING")

  function handleSubmit(event) {
    event.preventDefault()

    if (title.trim() === "" || author.trim() === "" || totalPages <= 0) {
      alert("Please fill all fields correctly.")
      return
    }

    props.onAddBook({
      title,
      author,
      totalPages,
      status
    })

    setTitle("")
    setAuthor("")
    setTotalPages("")
    setStatus("READING")
  }

  return (
    <div>
      <h1>Add Book</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Book title" onChange={(event) => setTitle(event.target.value)} value={title} />
        <input type="text" placeholder="Author" onChange={(event) => setAuthor(event.target.value)} value={author}  />
        <input type="number" placeholder="Total pages" onChange={(event) => setTotalPages(Number(event.target.value))} value={totalPages} />
        <select
          value={status}
          onChange={(event) => {setStatus(event.target.value)}}
        >
          <option value="WANT_TO_READ">Want To Read</option>
          <option value="READING">Reading</option>
          <option value="FINISHED">Finished</option>
          <option value="DNF">Did Not Finish</option>
        </select>

        <button type="submit">Add book</button>
      </form>
    </div>
  )
}

export default AddBook