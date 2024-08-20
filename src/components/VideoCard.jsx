import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const VideoCard = ({ title, thumbnail,  videoId, releaseDate, voteAverage }) => {
  return (
    <Link to={`/movie/${videoId}`} className="block bg-black rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 group hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 p-4 text-white z-10">
          <h2 className="text-lg font-semibold mb-1 truncate">{title}</h2>
          <div className="flex items-center text-sm mb-2">
            <FaStar className="text-yellow-400 mr-1" />
            <span>{voteAverage || 'N/A'}</span>
          </div>
          <p className="text-xs text-gray-400">{new Date(releaseDate).toLocaleDateString()}</p>
        </div>
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>
    </Link>
  );
};

export default VideoCard;
