import { useState } from 'react';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import ExerciseDisplay from './ExerciseDisplay';


function Home() {
  const [ setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="Container">
      <div className='container'>
      <div className="App bg-dark mt-3 mb-1 p-1">
        <h1 className="text-warning mt-4 text-center">FITFLEX HOME TRAINER 💪🏋️🏋️‍♀️ 🤼‍♂️</h1>
        <NavBar />
        <SearchBar onSearch={handleSearch} />
        </div>          
          <ExerciseDisplay />
      </div>
    </div>
  );
}
export default Home;

