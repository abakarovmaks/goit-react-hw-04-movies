import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import comingSoon from '../../images/comingSoon.png';

export default function MovieDetailsPage({ movie }) {
  const mappedGenres = movie.genres.map(genre => genre.name).join(', ');
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <>
      <div className={styles.wrapper}>
        <img
          className={styles.image}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : comingSoon
          }
          alt={movie.title}
        />
        <div className={styles.content}>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.text}>User score: {movie.vote_avarage * 10}%</p>
          <p className={styles.category}>Overview:</p>
          <p className={styles.text}>{movie.overview}</p>
          <p className={styles.category}>Genres:</p>
          <p className={styles.text}>{mappedGenres}</p>
        </div>
      </div>
      {/* <div className={styles.content}>
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.text}>User score: {movie.vote_avarage * 10}%</p>
        <p className={styles.category}>Overview:</p>
        <p className={styles.text}>{movie.overview}</p>
        <p className={styles.category}>Genres:</p>
        <p className={styles.text}>{mappedGenres}</p>
      </div> */}
      <div className={styles.nav}>
        <p className={styles.category}>Additional information</p>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to={{ pathname: `${url}/cast`, state: location.state }}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Cast
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to={{ pathname: `${url}/reviews`, state: location.state }}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

MovieDetailsPage.propTypes = {
  movie: PropTypes.object.isRequired,
};
