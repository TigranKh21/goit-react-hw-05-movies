import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getMovieInfo } from 'services/api';
import { default as Cast } from './Cast';
import { default as Reviews } from './Reviews';

import { BiArrowBack } from 'react-icons/bi';
import { Loader } from 'components/Loader/Loader';

import css from '../components/MovieDetails/MovieDetails.module.css';
import { toast } from 'react-toastify';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const goBackLinkRef = useRef(location.state?.from ?? '/');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieInfo(movieId);
        setMovieDetails(data);
      } catch (error) {
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      <section>
        <Link to={goBackLinkRef.current} className={css.homeBtn}>
          <div className={css.homeBtnText} type="button">
            <BiArrowBack />
            &nbsp; Go back
          </div>
        </Link>
      </section>
      {isLoading && <Loader />}
      {movieDetails && (
        <div>
          <section className={css.movieIdWrapper}>
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className={css.movieLargeImg}
            />
            <div className={css.movieText}>
              <h2>{movieDetails.title}</h2>
              <p className={css.userScores}>
                User score: {Math.round(movieDetails.vote_average * 10)}%
              </p>
              <h3>Owerview</h3>
              <p className={css.overviewText}>{movieDetails.overview}</p>
              <h3>Genres</h3>
              <ul className={css.genresList}>
                {movieDetails.genres.map(genre => (
                  <li key={genre.id} className={css.genresItem}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className={css.addSection}>
            <h3>Additional information</h3>
            <NavLink
              className={({ isActive }) =>
                `${css.addLink} ${isActive ? css.active : ''}`
              }
              to="cast"
            >
              Cast
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${css.addLink} ${isActive ? css.active : ''}`
              }
              to="reviews"
            >
              Reviews
            </NavLink>
          </section>
          <div>
            <Routes>
              <Route path="cast" element={<Cast id={movieId} />} />
            </Routes>
          </div>
          <div>
            <Routes>
              <Route path="reviews" element={<Reviews id={movieId} />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
