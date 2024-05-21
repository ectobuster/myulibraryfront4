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
      const response = await fetch('http://35.208.117.44:5000/api/books'); // Updated URL
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddToBackpack = async (book: Books) => {
    try {
      console.log('Adding book to backpack:', book); // Log the data being sent
      const response = await fetch('http://35.208.117.44:5000/api/book-checkouts', { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // Assuming user_id is 1 for this experiment
          book_id: book.book_id,
          title: book.title,
          author: book.author,
          published_year: book.published_year,
          genre: book.genre,
          checkout_date: new Date().toISOString(), // Current date as checkout date
        }),
      });
      if (response.ok) {
        console.log('Book added to backpack successfully');
  
        // Update the available count of the book in the database
        await fetch(`http://35.208.117.44:5000/api/books/${book.book_id}`, { // Updated URL
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "book_id": book.book_id,
            "title": book.title,
            "author": book.author,
            "published_year": book.published_year,
            "genre": book.genre,
            "available": book.available - 1
          }), // Send the full JSON representation of the book
        });
  
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

  // Sort the filteredBooks array by book_id before rendering
  const sortedBooks = filteredBooks.sort((a, b) => a.book_id - b.book_id);

  return (
    <div style={{ width: '1200px' }}>
      
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
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
      </Paper>


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
            {sortedBooks.map((book) => (
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
    </div>
  );
};

export default BookCatalog;