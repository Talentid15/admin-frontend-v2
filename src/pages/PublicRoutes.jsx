import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const userData = useSelector((state) => state.user.data);

    console.log("user data ",userData)

    if (userData) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
