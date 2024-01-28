import React from 'react';
import { useEffect, useState } from 'react';
import { getSerchedMovies } from '../services/api';
import css from '../components/Movie/MoviePage.module.css';
import { default as SearchPage } from 'pages/SearchPage';
import { SearchedMovieList } from 'components/Movie/SearchedMovieList';
import { useSearchParams } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searched, setSearched] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchQuery = searchParams.get('query');

  useEffect(() => {
    const fetchSearched = async () => {
      if (!searchQuery) {
        return;
      }
      try {
        const data = await getSerchedMovies(searchQuery);
        setSearched(data.results);
      } catch (error) {
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearched();
  }, [searchQuery]);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = e.currentTarget.elements.search.value;
    setSearchParams({ query: formData });
    e.target.reset();
  };

  return (
    <div className={css.moviePage}>
      <SearchPage
        searched={searched}
        handleSubmit={handleSubmit}
        searchQuery={searchQuery}
      />
      {isLoading && <Loader />}
      {searched && (
        <SearchedMovieList searched={searched} searchQuery={searchQuery} />
      )}
    </div>
  );
};

export default Movies;
