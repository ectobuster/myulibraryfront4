// import React, { useState, useEffect } from 'react';
// import { BookCheckout } from '../interfaces'; 
// import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';

// const UserBackpack = () => {
//   const [backpack, setBackpack] = useState<BookCheckout[]>([]);

//   useEffect(() => {
//     fetchBackpack();
//   }, []);

//   const fetchBackpack = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/book-checkouts');
//       const data = await response.json();
//       setBackpack(data);
//     } catch (error) {
//       console.error('Error fetching backpack:', error);
//     }
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>User ID</TableCell>
//             <TableCell>Book ID</TableCell>
//             <TableCell>Checkout Date</TableCell>
//             <TableCell>Return Date</TableCell>
//             <TableCell>Returned</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {backpack.map((checkout) => (
//             <TableRow key={checkout.checkout_id}>
//               <TableCell>{checkout.user_id}</TableCell>
//               <TableCell>{checkout.book_id}</TableCell>
//               <TableCell>{checkout.checkout_date}</TableCell>
//               <TableCell>{checkout.return_date}</TableCell>
//               <TableCell>{checkout.returned ? 'Yes' : 'No'}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default UserBackpack;



import React, { useState, useEffect } from 'react';
import { BookCheckout } from '../interfaces'; 
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button } from '@mui/material';

const UserBackpack = () => {
  const [backpack, setBackpack] = useState<BookCheckout[]>([]);

  useEffect(() => {
    fetchBackpack();
  }, []);

  const fetchBackpack = async () => {
    try {
      const response = await fetch('http://localhost:5000/book-checkouts');
      const data = await response.json();
      setBackpack(data);
    } catch (error) {
      console.error('Error fetching backpack:', error);
    }
  };

  const handleDeleteFromBackpack = async (checkoutId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/book-checkouts/${checkoutId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Book deleted from backpack successfully');
        // Refresh the table by fetching the updated backpack list from the backend
        fetchBackpack();
      } else {
        console.error('Failed to delete book from backpack');
        // Handle error
      }
    } catch (error) {
      console.error('Error deleting book from backpack:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Book ID</TableCell>
            <TableCell>Checkout Date</TableCell>
            <TableCell>Return Date</TableCell>
            <TableCell>Returned</TableCell>
            <TableCell>Action</TableCell> {/* New column for delete buttons */}
          </TableRow>
        </TableHead>
        <TableBody>
          {backpack.map((checkout) => (
            <TableRow key={checkout.checkout_id}>
              <TableCell>{checkout.user_id}</TableCell>
              <TableCell>{checkout.book_id}</TableCell>
              <TableCell>{checkout.checkout_date}</TableCell>
              <TableCell>{checkout.return_date}</TableCell>
              <TableCell>{checkout.returned ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteFromBackpack(checkout.checkout_id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserBackpack;
