import { HomePage } from './components/HomePage/HomePage';
import { MoviePage } from 'components/Movie/MoviePage';
import {
  getMovieInfo,
  getRatedMovies,
  getMovieCredits,
  getMovieReviews,
} from './services/api';
import { getSerchedMovies } from './services/api';
import { useEffect, useState } from 'react';
import css from './components/HomePage/HomePage.module.css';

export const App = () => {
  const [rated, setRated] = useState(null);
  const [tabPanel, setTabPanel] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [castData, setCastData] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const [addLink, setAddLink] = useState(null);

  useEffect(() => {
    const fetchRated = async () => {
      try {
        const data = await getRatedMovies();
        setRated(data.results);
      } catch (error) {
        console.error('Error fetching rated movies: ', error);
      }
    };
    fetchRated();
    setTabPanel('home');
  }, []);

  useEffect(() => {
    const fetchSearched = async () => {
      if (!searchQuery) {
        return;
      }
      try {
        const data = await getSerchedMovies(searchQuery);
        setSearched(data.results);
      } catch (error) {
        console.error('Error fetching search movie: ', error);
      }
    };
    fetchSearched();
    setSearchQuery('');
  }, [searchQuery]);

  useEffect(() => {
    console.log(addLink);
  }, [addLink]);

  const onClickMovie = movie => {
    const fetchMovieInfo = async () => {
      try {
        const info = await getMovieInfo(movie.id);
        setMovieData(info);
      } catch (error) {
        console.error('Error fetching movie info: ', error);
      }
    };
    fetchMovieInfo();
    setTabPanel('movie');
  };

  const onClickCast = id => {
    setAddLink('cast');
    if (castData) {
      return;
    }
    const fetchMovieCast = async () => {
      try {
        const data = await getMovieCredits(id);
        setCastData(data.cast);
      } catch (error) {
        console.error('Error fetching movie cast: ', error);
      }
    };
    fetchMovieCast();
  };

  const onClickReview = id => {
    setAddLink('review');
    if (reviewData) {
      return;
    }
    const fetchMovieReview = async () => {
      try {
        const data = await getMovieReviews(id);
        if (data.results.length) {
          setReviewData(data.results);
        } else {
          setReviewData([
            { content: "We don't have any reviews for this movie", id: 1 },
          ]);
        }
      } catch (error) {
        console.error('Error fetching movie cast: ', error);
      }
    };
    fetchMovieReview();
  };

  const handleGoHome = () => {
    setTabPanel('home');
    setMovieData('');
    setSearched('');
    setAddLink('');
    setCastData(null);
    setReviewData(null);
  };

  const handleSearch = formData => {
    setSearchQuery(formData);
  };

  return (
    <>
      <div className={css.tabPanel}>
        <button
          className={`${css.tab}
          ${tabPanel === 'home' ? css.active : ''} `}
          onClick={() => handleGoHome()}
        >
          Home
        </button>
        <button
          className={`${css.tab}
          ${tabPanel === 'movie' ? css.active : ''} `}
          onClick={() => setTabPanel('movie')}
        >
          Movie
        </button>
      </div>
      {tabPanel === 'home' && (
        <HomePage rated={rated} onClickMovie={onClickMovie} />
      )}
      {tabPanel === 'movie' && (
        <MoviePage
          handleSearch={handleSearch}
          handleGoHome={handleGoHome}
          movie={movieData}
          moviesList={searched}
          castData={castData}
          reviewData={reviewData}
          addLink={addLink}
          onClickMovie={onClickMovie}
          onClickCast={onClickCast}
          onClickReview={onClickReview}
        />
      )}
    </>
  );
};
