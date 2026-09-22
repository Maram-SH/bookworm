function Dashboard({ books }) {
  const totalCount = books.length

  const reading = books.filter((book) => book.status === "READING")
  const tbr = books.filter((book) => book.status === "WANT_TO_READ")
  const finished = books.filter((book) => book.status === "FINISHED")
  const dnf = books.filter((book) => book.status === "DNF")

  const totalPagesRead = books.reduce((accumulator, book) => {
    return accumulator + book.currentPage
  }, 0)

  const totalLibraryPages = books.reduce((accumulator, book) => {
    return accumulator + book.totalPages
  }, 0)

  const overallProgress = totalCount ? Math.round(totalPagesRead / totalLibraryPages * 100) : 0

  const readingStats = [
    {
      label: "Total pages read:",
      value: totalPagesRead,
      valueLabel: totalPagesRead === 1 ? "page" : "pages"
    }, {
      label: "Total pages across library:",
      value: totalLibraryPages,
      valueLabel: totalLibraryPages === 1 ? "page" : "pages"
    },
    {
      label: "Overall progress:",
      value: overallProgress,
      valueLabel: "%"
    }
  ]

  const readingCount = reading.length
  const tbrCount = tbr.length
  const finishedCount = finished.length
  const dnfCount = dnf.length

  const countStats = [
    {
      label: "Currently reading",
      count: readingCount
    },
    {
      label: "Want to read",
      count: tbrCount
    },
    {
      label: "Finished",
      count: finishedCount
    },
    {
      label: "Did not finish",
      count: dnfCount
    }
  ]

  return (
    <div>
      <h1>Welcome to Bookworm!</h1>
      <p>Total books: {totalCount} {totalCount === 1 ? "book" : "books"}</p>
      <div className="stats-container">
        {
          countStats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <h2>{stat.count} {stat.count === 1 ? "book" : "books"}</h2>
              <p>{stat.label}</p>
            </div>
          ))
        }
      </div>
      
      {!books ? (<p>Nothing to see here. Add books to view statistics!</p>) : (
        <div>
          <h2>Reading Statistics</h2>
          <div>
            {readingStats.map((stat) => (
              <div>
                <p>{stat.label} {stat.value} {stat.valueLabel}</p>
              </div>
            ))}
          </div>

          <h2>Currently Reading</h2>
          <div className="stats-container">
            {readingCount ? reading.map((book) => {
              const progress = Math.round((book.currentPage / book.totalPages) * 100)

              return (
                <div className="stat-card">
                  <h2>{book.title}</h2>
                  <p>{book.author}</p>
                  <p>{progress}% through</p>
                  <p>{book.currentPage} / {book.totalPages} pages</p>
                </div>
              )
            }
            ) : (<p>You don't have any books in currently reading.</p>)}
          </div>

          <h2>Want to Read</h2>
          <div className="stats-container">
            {tbrCount ? tbr.map((book) => {
              return (
                <div className="stat-card">
                  <h2>{book.title}</h2>
                  <p>{book.author}</p>
                  <p>{book.totalPages} pages</p>
                </div>
              )
            }
            ) : (<p>You don't have any books on your TBR</p>)}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard