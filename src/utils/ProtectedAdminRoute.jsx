import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContextData } from "../context/AppContext";

function ProtectedAdminRoute({ children }) {
 
  const { user } = useContext(AppContextData);

  if (!user) {
    return <Navigate to="/GoCart" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/GoCart" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;
