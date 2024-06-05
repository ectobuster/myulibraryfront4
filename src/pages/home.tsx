import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to your library
      </Typography>
      <Typography variant="h5" gutterBottom>
        Choose your role:
      </Typography>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigateTo('/books')}
          style={{ marginRight: '20px', width: '200px', height: '100px' }}
        >
          User
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigateTo('/librarian')}
          style={{ marginLeft: '20px', width: '200px', height: '100px' }}
        >
          Librarian
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
