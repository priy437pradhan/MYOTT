import { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import { fetchMovies } from '../api';

function Home() {
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

  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Featured Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map(movie => (
          <VideoCard
          key={movie.id}
          title={movie.title}
          thumbnail={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          // description={movie.overview}
          videoId={movie.id}
          releaseDate={movie.release_date} 
          voteAverage={movie.vote_average} 
        />
        ))}
      </div>
    </div>
  );
}

export default Home;
