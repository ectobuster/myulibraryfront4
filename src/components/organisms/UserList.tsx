import React, { useState, useEffect } from 'react';
import { Users } from '../interfaces'; 
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, TextField } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [newUser, setNewUser] = useState<Users>({
    user_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://35.208.117.44:5000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('http://35.208.117.44:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        console.log('User added successfully');
        // Refresh the table by fetching the updated user list from the backend
        fetchUsers();
        // Clear the form fields
        setNewUser({
          user_id: 0,
          first_name: '',
          last_name: '',
          email: '',
          role: ''
        });
      } else {
        console.error('Failed to add user');
        // Handle error
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('User deleted successfully');
        // Refresh the table by fetching the updated user list from the backend
        fetchUsers();
      } else {
        console.error('Failed to delete user');
        // Handle error
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Paper> {/* Add Paper component */}
      <div style={{ width: '1200px' }}>
        <TextField
          name="first_name"
          label="First Name"
          value={newUser.first_name}
          onChange={handleChange}
        />
        <TextField
          name="last_name"
          label="Last Name"
          value={newUser.last_name}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          value={newUser.email}
          onChange={handleChange}
        />
        <TextField
          name="role"
          label="Role"
          value={newUser.role}
          onChange={handleChange}
        />
        <Button onClick={handleAddUser}>Add User</Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteUser(user.user_id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

export default UserList;
