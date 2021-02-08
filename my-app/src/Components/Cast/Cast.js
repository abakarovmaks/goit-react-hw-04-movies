import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import moviesAPI from '../../services/movies-api';
import Loader from '../Loader/Loader';
import styles from './Cast.module.css';
import comingSoon from '../../images/comingSoon.png';

export default function Cast({ id }) {
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    ['movieCast', id],
    async () => {
      const data = await moviesAPI.getMovieCast(id);
      if (data.cast.length === 0) {
        throw new Error('Cast data is not available');
      }
      console.log(data.cast);
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
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {data.cast.map(actor => {
              return (
                <li className={styles.item} id={actor.cast_id}>
                  <img
                    className={styles.image}
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : comingSoon
                    }
                    alt={actor.name}
                  />
                  <p className={styles.name}>{actor.name}</p>
                  <p className={styles.character}>
                    Character: {actor.character ? actor.character : 'unknown'}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {isError && (
        <p style={{ fontFamily: 'Roboto, sans-serif' }}>{error.message}</p>
      )}
    </>
  );
}

Cast.propTypes = {
  id: PropTypes.number.isRequired,
};
