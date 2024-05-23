import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const LandingPage = () => {
  const history = useHistory();

  const navigateToStudent = () => {
    history.push('/student');
  };

  const navigateToLibrarian = () => {
    history.push('/librarian');
  };

  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to MyULibrary
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={navigateToStudent}
        style={{ margin: '20px', fontSize: '20px', padding: '10px 20px' }}
      >
        I am a Student
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={navigateToLibrarian}
        style={{ margin: '20px', fontSize: '20px', padding: '10px 20px' }}
      >
        I am a Librarian
      </Button>
    </Container>
  );
};

export default LandingPage;
