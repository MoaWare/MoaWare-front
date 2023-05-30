import { Navigate } from "react-router-dom";
import { isAdmin, isBoardAdmin, isLogin, isPost, isProject } from "../../utils/TokenUtils";

function ProtectedRoute({ loginCheck, authCheck, children, projectCheck, boardAdm, postCheck }) {
    
    if(projectCheck) {
        return isProject() ? children : <Navigate to="/"/> 
    }
    
    if(authCheck) {
        return isAdmin() ? children : <Navigate to="/"/>
    }
 
    if(boardAdm) {
        return isBoardAdmin() ? children : <Navigate to="/"/>
    }

    if(postCheck) {
        return isPost() ? children : <Navigate to="/"/>
    }

    if(loginCheck) {
        return isLogin() ? children : <Navigate to="/login"/>
    } else {
        return !isLogin() ? children : <Navigate to="/"/>
    }


}

export default ProtectedRoute;