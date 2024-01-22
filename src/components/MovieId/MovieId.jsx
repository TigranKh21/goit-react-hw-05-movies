import css from './MovieId.module.css';

export const MovieId = ({
  movie,
  castData,
  reviewData,
  onClickCast,
  onClickReview,
  addLink,
}) => {
  const { id, genres, title, overview, vote_average, poster_path } = movie;

  return (
    <div>
      <section className={css.movieIdWrapper}>
        <img
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}
          alt={title}
        />
        <div>
          <h2>{title}</h2>
          <p>User score: {Math.round(vote_average * 10)}%</p>
          <h3>Owerview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          {genres.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </div>
      </section>
      <section className={css.addSection}>
        <p>Additional information</p>
        <ul>
          <li>
            <button
              className={css.addLink}
              type="button"
              onClick={() => onClickCast(id)}
            >
              Cast
            </button>
          </li>
          <li>
            <button
              className={css.addLink}
              type="button"
              onClick={() => onClickReview(id)}
            >
              Reviews
            </button>
          </li>
        </ul>
      </section>
      {addLink === 'cast' && castData && (
        <ul>
          {castData.map(actor => (
            <li key={actor.id}>
              <img
                src={`https://www.themoviedb.org/t/p/w138_and_h175_bestv2${actor.profile_path}`}
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
      {addLink === 'review' && Array.isArray(reviewData) && reviewData && (
        <ul>
          {reviewData.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
