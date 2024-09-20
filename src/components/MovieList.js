import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://dummyapi.online/api/movies');
        console.log(response.data); // Log the response
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={movie.image} alt={movie.movie} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{movie.movie}</h2>
              <p className="text-gray-700">{movie.rating}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No movies available</p>
      )}
    </div>
  );
};

export default MovieList;
