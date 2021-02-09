import React from 'react';
import { useQuery } from 'react-query';
import moviesAPI from '../services/movies-api';
import MoviesPage from '../Components/MoviesPage/MoviesPage';
import Loader from '../Components/Loader/Loader';
import ErrorView from './ErrorView';

export default function HomeView() {
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    'trendingMovies',
    moviesAPI.getTrendingData,
  );

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && <MoviesPage movies={data.results} title="Trending today" />}
      {isError && <ErrorView title={error.message} />}
    </>
  );
}
