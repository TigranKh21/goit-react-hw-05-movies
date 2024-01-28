import { Link, useLocation } from 'react-router-dom';
import css from './TrendingMovies.module.css';

export const TrendMovieList = ({ moviesList }) => {
  const location = useLocation();
  return (
    <ul>
      {moviesList.map(movie => (
        <li className={css.movieLink} key={movie.id}>
          <Link state={{ from: location }} to={`/movies/${movie.id}`}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
