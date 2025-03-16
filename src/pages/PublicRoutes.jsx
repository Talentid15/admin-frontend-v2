
import { useSelector } from "react-redux"
const PublicRoute =({children})=>{

    const userData = useSelector((state)=>state.user.data);

    if(userData){
        return <Navigate to="/dashboard"></Navigate>
    }
    return children;
}

export default PublicRoute;