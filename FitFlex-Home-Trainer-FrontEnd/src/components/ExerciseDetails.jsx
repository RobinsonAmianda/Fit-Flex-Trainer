// ExerciseDetails.js
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from './NavBar';

function ExerciseDetails() {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    // Fetch exercise details using the ID
    fetch(`http://127.0.0.1:5500/exercises/${id}`)
      .then((response) => response.json())
      .then((data) => setExercise(data))
      .catch((error) => console.error('Error fetching Exercise details:', error));
  }, [id]);

  if (!exercise) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className='container bg-dark p-1 mb-1 mt-3'>
      <h1 className="text-warning mt-4 text-center">FITFLEX HOME TRAINER 💪🏋️🏋️‍♀️ 🤼‍♂️</h1>
      <br></br>
        <NavBar />
      </div>
    <div className='container h-100 mt-5 mb-5'>
    <div className="row h-100 justify-content-center align-items-center">
      <div className="card bg-light" style={{ width: '50%' }}>
        <img src={exercise.image} alt={exercise.name} className="card-img-top" style={{ height: '400px', objectFit: 'cover' }} />
        <div className="card-body">
          <h5 className="card-title">{exercise.name}</h5>
          <p className="mt-2 mb-0">{exercise.description}</p>
        </div>

        <Link to={`/home/`} className="btn btn-primary me-3">
          Go Back
        </Link>
      </div>
    </div>
    </div>
    </div>
  );
}

export default ExerciseDetails;