import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ path, element }) => {
 const { user } = useAuth();
 return (
    <Route
      path={path}
      element={user ? element : <Navigate to="/login" replace />}
    />
 );
};

export default PrivateRoute;



// If the user is authenticated (user is truthy), it renders the children. Otherwise, it navigates to the login page.

// The replace prop is used to replace the current entry in the history stack. The state prop is used to pass extra state to the route.