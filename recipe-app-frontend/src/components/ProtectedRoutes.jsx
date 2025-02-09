import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoutes() {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/auth/login");
  }, [navigate, isAuthenticated]);

  if (isAuthenticated) return <Outlet />;
}

export default ProtectedRoutes;
