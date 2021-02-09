import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import moviesAPI from '../../services/movies-api';
import Loader from '../Loader/Loader';
import styles from './Reviews.module.css';

export default function Reviews({ id }) {
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    ['movieReviews', id],
    async () => {
      const data = await moviesAPI.getMovieReviews(id);
      if (data.results.length === 0) {
        throw new Error('We dont have any reviews for this movie');
      }
      return data;
    },
    {
      retry: false,
    },
  );
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <ul className={styles.list}>
          {data.results.map(review => {
            return (
              <li className={styles.item} key={review.id}>
                <p className={styles.author}>{review.author}</p>
                <p className={styles.text}>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
      {isError && (
        <p style={{ fontFamily: 'Roboto, sans-serif' }}>{error.message}</p>
      )}
    </>
  );
}

Reviews.propTypes = {
  id: PropTypes.number.isRequired,
};
