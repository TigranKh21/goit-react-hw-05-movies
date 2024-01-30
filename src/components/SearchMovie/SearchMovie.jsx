import { FaMagnifyingGlass } from 'react-icons/fa6';
import css from './SearchMovie.module.css';

const SearchMovie = ({ setSearchParams }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const formData = e.currentTarget.elements.search.value;
    setSearchParams({ query: formData });
    e.target.reset();
  };

  return (
    <section className={css.searchSection}>
      {
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
            <FaMagnifyingGlass className={css.searchIcon} />
          </button>
        </form>
      }
    </section>
  );
};

export default SearchMovie;
