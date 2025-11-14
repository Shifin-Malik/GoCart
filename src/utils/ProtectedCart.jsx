import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContextData } from "../context/AppContext";

function ProtectedCartRoute({ children }) {
  const { user } = useContext(AppContextData);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "user") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedCartRoute;
