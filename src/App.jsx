import { HomePage } from './components/HomePage/HomePage';
import { Movie } from 'components/Movie/Movie';
import { getRatedMovies } from './services/api';
import { getSerchedMovies } from './services/api';
import { useEffect, useState } from 'react';
import css from './components/HomePage/HomePage.module.css';

export const App = () => {
  const [rated, setRated] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [tabPanel, setTabPanel] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(null);

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
    console.log(searched);
  }, [searched]);

  const handleChosenMovie = movie => {
    setChosen(prevChosen => {
      console.log(movie);
      return { movie };
    });
  };

  const handleGoHome = () => {
    setTabPanel('home');
    console.log('clicked');
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
          onClick={() => setTabPanel('home')}
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
        <HomePage
          rated={rated}
          chosen={chosen}
          handleChosenMovie={handleChosenMovie}
        />
      )}
      {tabPanel === 'movie' && (
        <Movie handleSearch={handleSearch} handleGoHome={handleGoHome} />
      )}
    </>
  );
};
