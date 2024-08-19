import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        setError('Failed to fetch movie details');
      }
    };

    getMovieDetails();
  }, [id]);

  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!movie) return <p className="text-center">Movie not found</p>;

  return (
    <div className="relative bg-black text-white">
      <img
        className="w-full h-[400px] object-cover"
        src={movie.Poster}
        alt={movie.Title}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-transparent"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              src={movie.Poster}
              alt={movie.Title}
            />
          </div>
          <div className="w-full md:w-2/3 md:pl-6">
            <h1 className="text-4xl font-extrabold mb-4">{movie.Title}</h1>
            <p className="text-lg text-gray-300 mb-2"><strong>Release Date:</strong> {movie.Released}</p>
            <p className="text-lg text-gray-300 mb-2"><strong>Director:</strong> {movie.Director}</p>
            <p className="text-lg text-gray-300 mb-2"><strong>Cast:</strong> {movie.Actors}</p>
            <p className="text-lg text-gray-300 mb-2"><strong>Genre:</strong> {movie.Genre}</p>
            <p className="text-lg text-gray-300 mb-4">{movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
