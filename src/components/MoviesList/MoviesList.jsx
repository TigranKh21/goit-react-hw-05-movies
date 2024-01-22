import css from './MoviesList.module.css';

export const MoviesList = ({ moviesList, onClickMovie }) => {
  return (
    <ul>
      {moviesList.map(movie => (
        <li
          className={css.movieLink}
          key={movie.id}
          onClick={() => {
            onClickMovie(movie);
          }}
        >
          <span href={movie.backdrop_path}>{movie.title}</span>
        </li>
      ))}
    </ul>
  );
};
