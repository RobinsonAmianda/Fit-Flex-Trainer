import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const ExerciseDailyRoutine = () => {
  const [exercises, setExercises] = useState([]);
  const [routine, setRoutine] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      // Redirect to the login page if not authenticated
      navigate('/login');
    }

    fetch('http://127.0.0.1:5500/exercises', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExercises(data.exercises || []); // Ensure data.exercises is an array
      })
      .catch((error) => {
        console.error('Error fetching exercises:', error);
      });

    // Load routine from localStorage on component mount
    const storedRoutine = JSON.parse(localStorage.getItem('dailyRoutine')) || [];
    setRoutine(storedRoutine);
  }, [navigate]);

  // Function to handle exercise selection
  const handleExerciseSelect = (event) => {
    const selectedExerciseId = parseInt(event.target.value);
    const exerciseToAdd = exercises.find((exercise) => exercise.id === selectedExerciseId);
    if (exerciseToAdd) {
      const updatedRoutine = [...routine, exerciseToAdd];
      setRoutine(updatedRoutine);
      // Save routine to localStorage
      localStorage.setItem('dailyRoutine', JSON.stringify(updatedRoutine));
    }
  };

  const handleRemoveExercise = (exerciseId) => {
    const updatedRoutine = routine.filter((exercise) => exercise.id !== exerciseId);
    setRoutine(updatedRoutine);
    // Save updated routine to localStorage
    localStorage.setItem('dailyRoutine', JSON.stringify(updatedRoutine));
  };

  return (
    <div className='container'>
      <div className='container bg-dark mt-3 mb-1 p-1'>
      <h1 className="text-warning mt-4 text-center">FITFLEX HOME TRAINER 💪🏋️🏋️‍♀️ 🤼‍♂️</h1>
      <br></br>
      <NavBar />
      </div>
      <div className="container mt-5 bg-dark mb-5" style={{ width: "70%" }}>
        <h2 className="text-warning mt-3">Daily Routine</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exerciseSelect" style={{ color: 'green', fontSize: '20px' }}>
                Select an Exercise
              </label>
              <select
                id="exerciseSelect"
                className="form-control"
                onChange={handleExerciseSelect}
                style={{ width: '50%' }}
              >
                <option value="">Select an exercise</option>
                {exercises.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <br></br>
            <h3 className="text-primary">Selected Exercises</h3>
            <div className="row">
              {routine.map((exercise) => (
                <div key={exercise.id} className="col-md-4 mb-4">
                  <div className="card" style={{ width: '100%' }}>
                    <img
                      src={exercise.image}
                      alt={exercise.name}
                      className="card-img-top"
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{exercise.name}</h5>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveExercise(exercise.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDailyRoutine;
