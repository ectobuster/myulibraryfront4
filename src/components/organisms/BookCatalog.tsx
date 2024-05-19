import React, { useState, useEffect } from 'react';
import { Books } from '../interfaces'; 
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, TextField, Button } from '@mui/material';

const BookCatalog = () => {
  const [books, setBooks] = useState<Books[]>([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchGenre, setSearchGenre] = useState('');

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

  const handleAddToBackpack = async (bookId: number, title: string) => {
    try {
      console.log('Adding book to backpack:', { bookId, title }); // Log the data being sent
      const response = await fetch('http://localhost:5000/book-checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // Assuming user_id is 1 for this experiment
          book_id: bookId,
          title: title, // Include the title of the book
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

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
    book.author.toLowerCase().includes(searchAuthor.toLowerCase()) &&
    book.genre.toLowerCase().includes(searchGenre.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Title"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      <TextField
        label="Author"
        value={searchAuthor}
        onChange={(e) => setSearchAuthor(e.target.value)}
      />
      <TextField
        label="Genre"
        value={searchGenre}
        onChange={(e) => setSearchGenre(e.target.value)}
      />
      <Button variant="contained" onClick={fetchBooks}>Search</Button>

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
            {filteredBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.book_id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.published_year}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.available}</TableCell>
                <TableCell>
                  <Button onClick={() => handleAddToBackpack(book.book_id, book.title)}>Add to Backpack</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookCatalog;
