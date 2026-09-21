import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
  const [ username, setUsername ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ error, setError ] = useState("")
  const navigate = useNavigate()

  async function handleRegister(event) {
    event.preventDefault()

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
        return
      }
      
      console.log("Signed up:", data)
      navigate("/login", { replace: true })
    } catch (error) {
      console.log(error)
      setError("Something went wrong")
    }
  } 

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  )
}

export default Register