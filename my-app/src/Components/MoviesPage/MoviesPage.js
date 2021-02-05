import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './MoviesPage.module.css';
import comingSoon from '../../images/comingSoon.png';
import makeSlug from '../../tools/slug';

export default function MoviesPage({ movies, title }) {
  const location = useLocation();
  const navRoute = `${location.pathname}${location.search}`;

  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      <ul className={styles.list}>
        {movies.map(movie => {
          const movieSlug = makeSlug(movie.title);
          return (
            <li key={movie.id} className={styles.item}>
              <Link
                to={{
                  pathname: `/movies/${movieSlug}-${movie.id}`,
                  state: navRoute,
                }}
                className={styles.link}
              >
                <img
                  className={styles.image}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : comingSoon
                  }
                  alt={movie.title}
                />
                <p className={styles.title}>{movie.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

MoviesPage.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};
