import React, { lazy, Suspense } from 'react';
import { Redirect, Route, useParams, useRouteMatch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import moviesAPI from '../services/movies-api';
import MovieDetailsPage from '../Components/MovieDetailsPage/MovieDetailsPage';
import Loader from '../Components/Loader/Loader';
import ErrorView from './ErrorView';
import Button from '../Components/Button/Button';

const Cast = lazy(() =>
  import('../Components/Cast/Cast' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../Components/Reviews/Reviews' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsView() {
  const { slug } = useParams();
  const { url, path } = useRouteMatch();

  const location = useLocation();

  const movieId = slug.match(/[0-9]+$/)[0];

  const isValidRoute =
    location.pathname === url ||
    location.pathname === `${url}/reviews` ||
    location.pathname === `${url}/cast`;

  const { isLoading, isError, isSuccess, data, error } = useQuery(
    ['searchMovies', movieId],
    async () => {
      const data = await moviesAPI.getMovieById(movieId);
      if (data.status_code === 34) {
        throw new Error('No details for this movie');
      }
      console.log(data);
      return data;
    },
    {
      retry: false,
    },
  );

  return (
    <>
      {!isValidRoute && <Redirect to="/" />}

      <div style={{ width: '100%' }}>
        <Button route={location.state} />
      </div>

      {isLoading && <Loader />}
      {isSuccess && <MovieDetailsPage movie={data} />}
      {isError && <ErrorView title={error.message} />}

      <Suspense fallback={<Loader />}>
        <Route path={`${path}/cast`}>{data && <Cast id={data.id} />}</Route>

        <Route path={`${path}/reviews`}>
          {data && <Reviews id={data.id} />}
        </Route>
      </Suspense>
    </>
  );
}
