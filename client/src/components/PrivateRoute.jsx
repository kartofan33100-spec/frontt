import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
