import BookCatalog from '../components/organisms/BookCatalog'
import AddBookform from '../components/organisms/AddBookform'


const Admin = () => {
  return (
    <div>
      <h1>Add New Book</h1>
      <AddBookform />
      <h1>Book Catalog</h1>
      <BookCatalog />
    </div>
  );
};

export default Admin;
