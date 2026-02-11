import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContextData } from "../context/AppContext";

const ProUserRoute = ({ children }) => {
  const { user, loading } = useContext(AppContextData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user?.role === "admin") {
    return <Navigate to="/GoCart/admin" replace />;
  }

  return children;
};

export default ProUserRoute;
