import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import moviesAPI from '../services/movies-api';
import SearchForm from '../Components/SearchForm/SearchForm';
import MoviesPage from '../Components/MoviesPage/MoviesPage';
import Loader from '../Components/Loader/Loader';
import ErrorView from './ErrorView';
import { toast } from 'react-toastify';

export default function SearchMoviesView() {
  const history = useHistory();
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get('query') ?? '';

  const { isLoading, isError, isSuccess, data, error } = useQuery(
    ['searchMovies', searchQuery],
    async () => {
      const data = await moviesAPI.getSearchData(searchQuery);
      if (data.results.length === 0) {
        // throw new Error(`No results for ${searchQuery}. Try another query.`);
        throw new Error(
          toast.error(`No results for ${searchQuery}. Try another query.`),
        );
      }

      return data;
    },
    {
      enabled: searchQuery !== '',
      retry: false,
    },
  );

  const onSearchQueryChange = query => {
    history.push({ ...location, search: `query=${query}` });
  };

  return (
    <>
      <SearchForm getSearchQuery={onSearchQueryChange} />
      {isLoading && <Loader />}
      {isSuccess && data && (
        <MoviesPage
          movies={data.results}
          title={`Search results for ${searchQuery}`}
        />
      )}
      {isError && <ErrorView title={error.message} />}
    </>
  );
}
