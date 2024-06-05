import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function NavigationBar() {
  return (
    <AppBar position="sticky" >
      <Toolbar>
        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
          My U library
        </Typography>
      </Toolbar>

      <Toolbar>
        <div style={{ marginRight: '200px', padding: '20px' }}>
          <h3>User features</h3>
          <Link to="/books" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Books</Button>
          </Link>
          <Link to="/backpack" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Backpack</Button>
          </Link>
        </div>

        <div style={{ marginLeft: '200px', padding: '20px' }}>
          <h3>Admin features</h3>
          <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Users</Button>
          </Link>
          <Link to="/Librarian" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Librarian</Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
