import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    // Redirect to the login page if no token is found
    return <Navigate to="/auth" replace />;
  }

  // Render the children if a token exists
  return children;
}
