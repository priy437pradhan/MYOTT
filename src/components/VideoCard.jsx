import { Link } from 'react-router-dom';

const VideoCard = ({ title, thumbnail, description, videoId }) => {
  return (
    <Link to={`/movie/${videoId}`} className="block group relative">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform group-hover:scale-105">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-64 object-cover transition-opacity group-hover:opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
        <div className="absolute bottom-0 p-4 text-white z-10">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
