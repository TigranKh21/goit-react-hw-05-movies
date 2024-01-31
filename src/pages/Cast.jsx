import { useEffect, useState } from 'react';
import { getMovieCredits } from 'services/api';
import { useParams } from 'react-router-dom';

import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';

import css from '../components/MovieDetails/MovieDetails.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchingActors = async () => {
      if (actors) {
        return;
      }
      try {
        const data = await getMovieCredits(movieId);
        setActors(data);
      } catch (error) {
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchingActors();
  }, [movieId, actors]);

  return (
    isLoading && <Loader />,
    actors && (
      <section>
        <ul className={css.addInfoCast}>
          {actors.cast.map(actor => (
            <li key={actor.id} className={`${css.addInfoItemCast} ${css.cast}`}>
              <img
                src={
                  `${actor.profile_path}`
                    ? `https://www.themoviedb.org/t/p/w138_and_h175_bestv2${actor.profile_path}`
                    : '../img/NO_IMAGE.png'
                }
                alt={actor.name}
                onError={e => {
                  e.target.alt = '';
                  e.target.style = 'width: 138px; height: 175px;';
                }}
                className={css.noImg}
              />
              <div className={css.castText}>
                <p>{actor.name}</p>
                <p>{actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  );
};

export default Cast;
