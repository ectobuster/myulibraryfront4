

import React, { useState, useEffect } from 'react';
import { Books } from '../interfaces'; // Adjust the path based on your project structure
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';

const BookList = () => {
  const [books, setBooks] = useState<Books[]>([])


  useEffect(() => {
    fetch('http://localhost:5000/books') 
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>Published Year</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {books.map((Books) => (
          <TableRow key={Books.id}>
            <TableCell>{Books.title}</TableCell>
            <TableCell>{Books.author}</TableCell>
            <TableCell>{Books.published_year}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
  );
};

export default BookList;
