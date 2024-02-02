import { Container, Card } from 'react-bootstrap';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>ICC</h1>
          <p className='text-center mb-4'>
            This is a protected page! To be accessed after login
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default AdminScreen;
