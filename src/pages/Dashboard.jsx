function Dashboard(props) {
  const readingCount = props.books.filter((book) => book.status === "READING").length
  const tbrCount = props.books.filter((book) => book.status === "WANT_TO_READ").length
  const finishedCount = props.books.filter((book) => book.status === "FINISHED").length
  const dnfCount = props.books.filter((book) => book.status === "DNF").length

  const stats = [
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
      <div className="stats-container">
        {
          stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <h2>{stat.count} {stat.count === 1 ? "book" : "books"}</h2>
              <p>{stat.label}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard