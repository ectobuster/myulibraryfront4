import React, { useState, useEffect } from 'react';
import { Users } from '../interfaces'; 
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/users') // Update the endpoint to fetch users
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
