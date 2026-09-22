import { Navigate } from "react-router-dom"

function ProtectedRoute({ user, loadingUser,  children }) {
  if (loadingUser) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute