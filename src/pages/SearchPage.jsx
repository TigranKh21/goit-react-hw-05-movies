import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import css from '../components/Movie/MoviePage.module.css';

const SearchPage = ({ handleSubmit }) => {
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

export default SearchPage;
