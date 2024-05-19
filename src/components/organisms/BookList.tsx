import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button } from '@mui/material';

const BookList = ({ books, handleAddToBackpack }) => {
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
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.book_id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.published_year}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.available}</TableCell>
              <TableCell>
                <Button onClick={() => handleAddToBackpack(book)}>Add to Backpack</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookList;
