import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/auth/login");
  }, [navigate, isAuthenticated]);

  if (isAuthenticated) return children;
}

export default ProtectedRoutes;
