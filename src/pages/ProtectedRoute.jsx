
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({children})=>{

    const userData = useSelector((state)=>state.user.data);

    if(userData){

        return children;
    }
    return <Navigate to="/login"></Navigate>
}


export default ProtectedRoute;