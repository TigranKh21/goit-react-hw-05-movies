import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import { getSerchedMovies } from '../services/api';
import { default as SearchMovie } from 'components/SearchMovie/SearchMovie';
import { TrendMovieList } from '../components/MoviesList/MoviesList';
import { Loader } from 'components/Loader/Loader';

import css from '../components/SearchMovie/SearchMovie.module.css';

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

  return (
    <div className={css.moviePage}>
      <SearchMovie setSearchParams={setSearchParams} />
      {isLoading && <Loader />}
      {searched && <TrendMovieList moviesList={searched} />}
    </div>
  );
};

export default Movies;
