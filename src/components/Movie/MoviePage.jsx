import css from './MoviePage.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { BiArrowBack } from 'react-icons/bi';
import { MovieId } from 'components/MovieId/MovieId';
import { MoviesList } from 'components/MoviesList/MoviesList';

export const MoviePage = ({
  handleSearch,
  handleGoHome,
  movie,
  moviesList,
  castData,
  reviewData,
  addLink,
  onClickMovie,
  onClickCast,
  onClickReview,
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    const formData = e.currentTarget.elements.search.value;
    handleSearch(formData);
    e.target.reset();
    console.log('click');
  };

  return (
    <div className={css.moviePage}>
      <button
        className={`${css.searchBtn} ${css.homeBtn}`}
        type="button"
        onClick={() => {
          handleGoHome();
        }}
      >
        <BiArrowBack />
        &nbsp; Go back
      </button>
      {!movie && !moviesList && (
        <form className={css.searchBtn} onSubmit={handleSubmit}>
          <input
            className={css.inputForm}
            type="text"
            autoFocus
            name="search"
          />
          <button
            className={css.searchBtn}
            type="submit"
            width="30"
            height="30"
          >
            <FaMagnifyingGlass />
          </button>
        </form>
      )}
      {movie && (
        <MovieId
          movie={movie}
          reviewData={reviewData}
          onClickCast={onClickCast}
          castData={castData}
          onClickReview={onClickReview}
          addLink={addLink}
        />
      )}
      {moviesList && !movie && (
        <MoviesList moviesList={moviesList} onClickMovie={onClickMovie} />
      )}
    </div>
  );
};
