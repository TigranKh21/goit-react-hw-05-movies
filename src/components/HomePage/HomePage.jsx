import { MoviesList } from 'components/MoviesList/MoviesList';
import css from './HomePage.module.css';

export const HomePage = ({ rated, onClickMovie }) => {
  return (
    <div className={css.homePage}>
      <h2>Trending today</h2>
      <ul>
        {rated && <MoviesList moviesList={rated} onClickMovie={onClickMovie} />}
      </ul>
    </div>
  );
};
