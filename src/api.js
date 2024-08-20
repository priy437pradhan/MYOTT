const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (query) => {
  try {
    const response = await fetch(`${API_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.Search; 
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};


