import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';

import { BiArrowBack } from 'react-icons/bi';
import { toast } from 'react-toastify';

import { Loader } from 'components/Loader/Loader';
import { getMovieInfo } from 'services/api';

import css from '../components/MovieDetails/MovieDetails.module.css';

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
              src={
                `${movieDetails.poster_path}`
                  ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`
                  : '../img/NO_IMAGE.png'
              }
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
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
