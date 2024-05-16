


import React, { useState, useEffect } from 'react';
import { Books } from '../interfaces'; 
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button } from '@mui/material';

const BookCatalog = () => {
  const [books, setBooks] = useState<Books[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddToBackpack = async (bookId: number) => {
    try {
      const response = await fetch('http://localhost:5000/book-checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // Assuming user_id is 1 for this experiment
          book_id: bookId,
          checkout_date: new Date().toISOString(), // Current date as checkout date
        }),
      });
      if (response.ok) {
        console.log('Book added to backpack successfully');
        
        // Refresh the table by fetching the updated book list from the backend
        fetchBooks();
      } else {
        console.error('Failed to add book to backpack');
        // Handle error
      }
    } catch (error) {
      console.error('Error adding book to backpack:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Published Year</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books
            .filter((book) => book.available > 0) // Filter books with available units greater than 0
            .map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.book_id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.published_year}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.available}</TableCell>
                <TableCell>
                  <Button onClick={() => handleAddToBackpack(book.book_id)}>Add to Backpack</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookCatalog;
