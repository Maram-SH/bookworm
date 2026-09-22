import { Link, useNavigate } from "react-router-dom"

function NavBar({user, onLogOut}) {
  const navigate = useNavigate()

  async function handleLogOut() {
    try {
      const response= await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include"
      })

      if (!response.ok) {
        console.log("Log out failed")
        return
      }

      onLogOut(null) // aka setUser

      navigate("/login", {replace: true})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="navbar">
      {user ? (
        <div>
          <Link to="/">Dashboard</Link>
          <Link to="/library">Library</Link>
          <Link to="/add_book">Add Book</Link>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Log In</Link>
          <Link to="/register">Register</Link>
        </div>
      )} 
    </nav>
  )
}

export default NavBar