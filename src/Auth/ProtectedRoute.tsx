import { Navigate } from "react-router-dom";
import { useContext, ReactNode } from "react";
import { AuthContext } from "../Auth/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
