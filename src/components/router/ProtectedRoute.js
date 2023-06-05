import { Navigate } from "react-router-dom";
import { isAdmin, isBoardAdmin, isLogin, isPost, isProject } from "../../utils/TokenUtils";
import { toast } from "react-toastify";

function ProtectedRoute({ loginCheck, authCheck, children, projectCheck, boardAdm, postCheck }) {
    
  const showErrorMessage = () => {
    toast.error('접근 권한이 없습니다.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: false,
      progressStyle: {
        backgroundColor: '#ff000074',
        height: '5px',
      },
    });
  };

  if (projectCheck) {
    return isProject() ? children : (showErrorMessage(), <Navigate to="/" />);
  }

  if (authCheck) {
    return isAdmin() ? children : (showErrorMessage(), <Navigate to="/" />);
  }

  if (boardAdm) {
    return isBoardAdmin() ? children : (showErrorMessage(), <Navigate to="/" />);
  }

  if (postCheck) {
    return isPost() ? children : (showErrorMessage(), <Navigate to="/boardPosts" />);
  }

  if (loginCheck) {
    return isLogin() ? children : <Navigate to="/login" />;
  } else {
    return !isLogin() ? children : <Navigate to="/" />;
  }
}

export default ProtectedRoute;
