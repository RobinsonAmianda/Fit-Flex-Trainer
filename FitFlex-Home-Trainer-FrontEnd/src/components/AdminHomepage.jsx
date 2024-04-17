import { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import SearchBar from './SearchBar';
import ExerciseDisplay from './ExerciseDisplay';


function AdminHomepage() {
  const [ setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="Container">
      <div className="App">
        <div className='container bg-dark p-1 mb-1 mt-3'>
        <h1 className="text-warning mt-4 text-center">FITFLEX HOME TRAINER 💪🏋️🏋️‍♀️ 🤼‍♂️</h1>
        <br></br>       
          <AdminNavbar />
          <SearchBar onSearch={handleSearch} />
          </div>
          <ExerciseDisplay />
          
      </div>
    </div>
  );
}
export default AdminHomepage;

