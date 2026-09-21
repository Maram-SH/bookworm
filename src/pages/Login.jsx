import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";

function Login() {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ error, setError ] = useState("")
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault()

    setError("")

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
        return
      }

      navigate("/", { replace: true })

      console.log("Logged in:", data)
    } catch (error) {
      console.log(error)
      setError("Something went wrong")
    }
  }

  return (
    <div>
      <h1>Log in</h1>
      
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(event) => setEmail(event.target.value)} 
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(event) => setPassword(event.target.value)} 
          />
        </div>

        <button type="submit">Log in</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  )
}

export default Login