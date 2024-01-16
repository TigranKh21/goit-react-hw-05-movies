import css from './Movie.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { BiArrowBack } from 'react-icons/bi';

export const Movie = ({ handleSearch, handleGoHome }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const formData = e.currentTarget.elements.search.value;
    handleSearch(formData);
    e.target.reset();
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
        &nbsp; Go home
      </button>
      <form
        className={`${css.searchBtn} ${css.searchIcon}`}
        onSubmit={handleSubmit}
      >
        <input className={css.inputForm} type="text" autoFocus name="search" />
        <button className={css.searchBtn} type="submit" width="30" height="30">
          <FaMagnifyingGlass />
        </button>
      </form>
    </div>
  );
};
