import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjZlNzE4ODYzZmNmOTJiMTg2MmFmMDRkODg4OWFjNSIsInN1YiI6IjY1YTNlMzhhZDM1ZGVhMDEyYjQzMTk5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8D5S1n3MyXTt81sBIwRHKKTrNpFbm27H0nNs045kaEo';
/* const API_KEY = '1f6e718863fcf92b1862af04d8889ac5'; */
const RATED_ENDPOINT = '/trending/movie/day?language=en-US';
const SEARCH_ENDPOINT = '/search/movie';
const MOVIE_ENDPOINT = '/movie/';

export const getRatedMovies = async () => {
  const res = await axios(RATED_ENDPOINT);
  return res.data;
};

export const getSerchedMovies = async query => {
  const res = await axios(
    SEARCH_ENDPOINT +
      '?query=' +
      query +
      '&include_adult=false&language=en-US&page=1'
  );
  return res.data;
};

export const getMovieInfo = async id => {
  const res = await axios(MOVIE_ENDPOINT + id + '?language=en-US');
  return res.data;
};

export const getMovieCredits = async id => {
  const res = await axios(MOVIE_ENDPOINT + id + '/credits?language=en-US');
  return res.data;
};

export const getMovieReviews = async id => {
  const res = await axios(MOVIE_ENDPOINT + id + '/reviews?language=en-US');
  return res.data;
};
