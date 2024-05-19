import React, { useState, ChangeEvent } from 'react';
import { Button, TextField, Paper } from '@mui/material';

const AddBookForm = () => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    published_year: '',
    genre: '',
    available: '1' // Default available units is set to 1
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddBook = async () => {
    try {
      const response = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      if (response.ok) {
        console.log('Book added successfully');
        // Clear the form fields after adding the book
        setNewBook({
          title: '',
          author: '',
          published_year: '',
          genre: '',
          available: '1' // Reset available units to 1 after adding the book
        });
      } else {
        console.error('Failed to add book');
        // Handle error
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div style={{ width: '1200px' }}>
    <Paper elevation={3} style={{ padding: '20px' }}>
      <TextField
        name="title"
        label="Title"
        value={newBook.title}
        onChange={handleInputChange}
      />
      <TextField
        name="author"
        label="Author"
        value={newBook.author}
        onChange={handleInputChange}
      />
      <TextField
        name="published_year"
        label="Published Year"
        value={newBook.published_year}
        onChange={handleInputChange}
      />
      <TextField
        name="genre"
        label="Genre"
        value={newBook.genre}
        onChange={handleInputChange}
      />
      <TextField
        name="available"
        label="Available"
        type="number"
        value={newBook.available}
        onChange={handleInputChange}
      />
      <Button onClick={handleAddBook}>Add Book</Button>
    </Paper>
    </div>
  );
};

export default AddBookForm;
