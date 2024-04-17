import { useState, useEffect } from 'react';
import ExerciseCard from './ExerciseCard'; // Import ExerciseCard component

const ExerciseDisplay = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('http://127.0.0.1:5500/exercises', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setExercises(data.exercises);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Define the handleLike function
  const handleLike = async (id, updatedLike) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`http://127.0.0.1:5500/exercises/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ like: updatedLike }),
      });

      // Handle the response accordingly
      // You might want to update the state or trigger a refetch of data
      console.log('Like action:', response.status);
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  // Define the handleDislike function
  const handleDislike = async (id, updatedDislike) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`http://127.0.0.1:5500/exercises/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dislike: updatedDislike }),
      });

      // Handle the response accordingly
      // You might want to update the state or trigger a refetch of data
      console.log('Dislike action:', response.status);
    } catch (error) {
      console.error('Error handling dislike:', error);
    }
  };

  return (
    <div className="exercise-list container mt-5">
      <h1 className="text-warning fw-bold fs-20">Exercise List</h1>
      <div className="row">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onLike={(exerciseId, updatedLike) => handleLike(exerciseId, updatedLike)}
            onDislike={(exerciseId, updatedDislike) => handleDislike(exerciseId, updatedDislike)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExerciseDisplay;
