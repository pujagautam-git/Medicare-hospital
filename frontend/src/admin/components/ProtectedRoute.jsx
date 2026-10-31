import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../../services/api";

function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await api.get("/auth/profile");
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        setIsAuthenticated(false);
      }
    };

    verifyAdmin();
  }, []);

  if (isAuthenticated === null) {
    return <div className="admin-loading">Verifying admin access...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;