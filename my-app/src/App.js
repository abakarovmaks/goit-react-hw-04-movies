import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Container from './Components/Container/Container';
import Header from './Components/Header/Header';
import Loader from './Components/Loader/Loader';

const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "home-view" */),
);
const SearchMoviesView = lazy(() =>
  import('./views/MoviesPageView' /* webpackChunkName: "movies-search-view" */),
);
const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetailsView' /* webpackChunkName: "movie-details-view" */
  ),
);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Header />

        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/" exact>
              <HomeView />
            </Route>

            <Route path="/movies" exact>
              <SearchMoviesView />
            </Route>

            <Route path="/movies/:slug">
              <MovieDetailsView />
            </Route>

            <Redirect to="/" />
          </Switch>
        </Suspense>

        <ToastContainer autoClose={3000} />
      </Container>
    </QueryClientProvider>
  );
}
