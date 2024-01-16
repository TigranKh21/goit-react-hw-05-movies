import css from './HomePage.module.css';

export const HomePage = ({ rated, handleChosenMovie }) => {
  return (
    <div className={css.homePage}>
      <h2>Trending today</h2>
      <ul>
        {rated &&
          rated.map(ratedItem => (
            <li
              className={css.movieLink}
              key={ratedItem.id}
              onClick={() => {
                handleChosenMovie(ratedItem);
              }}
            >
              <span href={ratedItem.backdrop_path}>{ratedItem.title}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
