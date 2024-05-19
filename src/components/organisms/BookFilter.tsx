import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';

interface FilterProps {
  onFilter: (filters: { searchTitle: string, searchAuthor: string, searchGenre: string }) => void;
}

const BookFilter: React.FC<FilterProps> = ({ onFilter }) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchGenre, setSearchGenre] = useState('');

  const handleFilter = () => {
    onFilter({ searchTitle, searchAuthor, searchGenre });
  };

  return (
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
      <Button variant="contained" onClick={handleFilter}>Search</Button>
    </Paper>
  );
};

export default BookFilter;
