import { useEffect, useState } from 'react';

import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';

import { TrendMovieList } from '../components/MoviesList/MoviesList';
import { getRatedMovies } from '../services/api';

import css from '../components/MoviesList/MoviesList.module.css';

export const HomePage = () => {
  const [rated, setRated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRated = async () => {
      try {
        const data = await getRatedMovies();
        setRated(data.results);
      } catch (error) {
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRated();
  }, []);

  return (
    <div>
      <section>
        {isLoading && <Loader />}
        <div className={css.homePage}>
          <h2>Trending today</h2>
        </div>
      </section>
      {rated && <TrendMovieList moviesList={rated} />}
    </div>
  );
};
