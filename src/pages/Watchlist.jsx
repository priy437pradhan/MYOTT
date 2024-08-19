import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovies } from '../api';
import { FaPlayCircle, FaStar } from 'react-icons/fa';

function WatchList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies('popular');
        setMovies(data);
      } catch (error) {
        setError('Failed to fetch movies');
      }
    };

    getMovies();
  }, []);

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500 text-xl">{error}</p>
    </div>
  );

  return (
    <div className="bg-black min-h-screen p-6">
      <h1 className="text-4xl font-bold text-white text-center mb-12">Watchlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.imdbID}
            to={`/movie/${movie.imdbID}`}
            className="group block max-w-sm bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="relative">
              <img
                className="w-full h-72 object-cover"
                src={movie.Poster}
                alt={movie.Title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-4 flex items-center justify-between w-full">
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 transition-colors duration-300">
                  <FaPlayCircle className="text-xl" />
                  <span>Play</span>
                </button>
                <div className="text-yellow-400 flex items-center space-x-1">
                  <FaStar className="text-xl" />
                  <span className="text-sm">{movie.Rating}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">{movie.Title}</h3>
              <p className="text-gray-300 text-sm truncate">{movie.Plot}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WatchList;
