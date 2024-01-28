import React, { useState } from 'react';
import { getMovieCredits } from 'services/api';

import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';

import css from '../components/MovieDetails/MovieDetails.module.css';

const Cast = ({ id }) => {
  const [actors, setActors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchingActors = async () => {
    if (actors) {
      return;
    }
    try {
      const data = await getMovieCredits(id);
      setActors(data);
    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  fetchingActors();
  return (
    isLoading && <Loader />,
    actors && (
      <section>
        <ul className={css.addInfoCast}>
          {actors.cast.map(actor => (
            <li key={actor.id} className={`${css.addInfoItemCast} ${css.cast}`}>
              <img
                src={`https://www.themoviedb.org/t/p/w138_and_h175_bestv2${actor.profile_path}`}
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
