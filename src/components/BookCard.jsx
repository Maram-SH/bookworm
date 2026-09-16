import { useState } from "react";

function BookCard(props) {
  const [currentPage, setCurrentPage] = useState(props.currentPage ?? 0)
  const [newTotalPages, setNewTotalPages] = useState(props.totalPages ?? 0)
  const [editingPages, setEditingPages] = useState(false)

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

      <button onClick={() => setEditingPages(true)}>
        Edit Page Count
      </button>

      { editingPages && (
        <div>
          <input
            type="number"
            value={newTotalPages}
            onChange={(event) => {
              setNewTotalPages(Number(event.target.value))
            }}
          />

          <button
            onClick={() => {
              const success = props.onPagesChange(
                props.id,
                newTotalPages,
                currentPage
              )

              if (success) {
                setEditingPages(false)
              }
            }}
          >
            Save Pages
          </button>
        </div>
      )}

      {(props.status === "READING" || props.status === "FINISHED" || props.status === "DNF") && (
        <div>
          <p>{props.progress}% complete</p>

          {props.status === "READING" && (
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
                  props.onProgressChange(props.id, currentPage)
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

      <button onClick={() => props.onDelete(props.id)}>Delete</button>
    </div>
  )
}

export default BookCard