import React, { useState, useEffect } from 'react';
import { BookCheckout, Books } from '../interfaces'; 
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button } from '@mui/material';

const UserBackpack = () => {
  const [backpack, setBackpack] = useState<BookCheckout[]>([]);

  useEffect(() => {
    fetchBackpack();
  }, []);

  const fetchBackpack = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/book-checkouts');
      const data = await response.json();
      setBackpack(data);
    } catch (error) {
      console.error('Error fetching backpack:', error);
    }
  };

  const handleReturnBook = async (checkout: BookCheckout) => {
    try {
      // Delete the checkout record
      const deleteResponse = await fetch(`http://localhost:5000/api/book-checkouts/${checkout.checkout_id}`, {
        method: 'DELETE',
      });

      if (deleteResponse.ok) {
        // Fetch the book details to update the available count
        const bookResponse = await fetch(`http://localhost:5000/api/books/${checkout.book_id}`);
        const bookData: Books = await bookResponse.json();

        // Update the available count of the book in the database
        const updateBookResponse = await fetch(`http://localhost:5000/api/books/${checkout.book_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...bookData,
            available: bookData.available + 1 // Increase the available count
          }),
        });

        if (updateBookResponse.ok) {
          console.log('Book returned and available count updated successfully');
          // Refresh the table by fetching the updated backpack list from the backend
          fetchBackpack();
        } else {
          console.error('Failed to update book available count');
        }
      } else {
        console.error('Failed to return book');
      }
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <div style={{ width: '1200px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>Book ID</TableCell>
              <TableCell>Checkout Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Returned</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {backpack.map((checkout) => (
              <TableRow key={checkout.checkout_id}>
                <TableCell>{checkout.user_id}</TableCell>
                <TableCell>{checkout.title}</TableCell>
                <TableCell>{checkout.book_id}</TableCell>
                <TableCell>{checkout.checkout_date}</TableCell>
                <TableCell>{checkout.return_date}</TableCell>
                <TableCell>{checkout.returned ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleReturnBook(checkout)}>Return</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserBackpack;
