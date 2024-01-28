import { Suspense, lazy } from 'react';

import { Loader } from 'components/Loader/Loader';
import { SharedLayout } from 'components/SharedLayout/SharedLayout';

import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const Movies = lazy(() => import('pages/Movies'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const Cast = lazy(() => import('./pages/Cast'));
const Reviews = lazy(() => import('./pages/Reviews'));

export const App = () => {
  return (
    <SharedLayout>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/*" element={<Movies />} />
            <Route path="/movies/:movieId/*" element={<MovieDetails />} />
            <Route path="/movies/movieId/cast" element={<Cast />} />
            <Route path="/movies/movieId/reviews" element={<Reviews />} />
          </Routes>
        </Suspense>
      </main>
    </SharedLayout>
  );
};
