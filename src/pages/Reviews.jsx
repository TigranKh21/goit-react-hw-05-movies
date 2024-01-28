import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';

import { getMovieReviews } from 'services/api';

import css from '../components/MovieDetails/MovieDetails.module.css';

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState(null);
  const [noReviews, setNoReviews] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchingReviews = async () => {
      if (reviews) {
        return;
      }
      try {
        const data = await getMovieReviews(id);
        if (data.results.length) {
          setReviews(data.results);
        } else {
          setNoReviews(true);
        }
      } catch (error) {
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchingReviews();
  }, [id, reviews]);

  return (
    isLoading && <Loader />,
    (
      <section>
        {reviews && (
          <ul className={css.addInfoReview}>
            {reviews.map(review => (
              <li className={css.addInfoItem} key={review.id}>
                <h3 className={css.reviewAuthor}>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        )}
        {noReviews && (
          <p className={css.noReviews}>
            We don't have any reviews for this movie
          </p>
        )}
      </section>
    )
  );
};

export default Reviews;
