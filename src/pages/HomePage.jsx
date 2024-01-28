import React from 'react';
import { useEffect, useState } from 'react';
import { TrendMovieList } from '../components/HomePage/TrendMovieList';
import { getRatedMovies } from '../services/api';
import css from '../components/HomePage/TrendingMovies.module.css';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';

const HomePage = () => {
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
    <section>
      {isLoading && <Loader />}
      <div className={css.homePage}>
        <h2>Trending today</h2>
        <ul>{rated && <TrendMovieList moviesList={rated} />}</ul>
      </div>
    </section>
  );
};

export default HomePage;
