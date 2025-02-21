import { Navigate } from "react-router-dom";
import { useContext, ReactNode } from "react";
import { AuthContext } from "../Auth/AuthContext";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return !currentUser ? <>{children}</> : <Navigate to="/home" />;
};

export default PublicRoute;
