// App.jsx
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import AppRoutes from './components/AppRoutes'; 
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <>
        <Header />
        <ToastContainer />
        <Container className='my-2'>
          <AppRoutes />
        </Container>
      </>
    </AuthProvider>
  );
};

export default App;
