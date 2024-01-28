import { Link, useLocation } from 'react-router-dom';
import css from './MoviePage.module.css';

export const SearchedMovieList = ({ searched }) => {
  const location = useLocation();
  return (
    <section>
      <ul>
        {searched.map(movie => (
          <li className={css.movieLink} key={movie.id}>
            <Link state={{ from: location }} to={`/movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
