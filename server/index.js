require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const MOVIES_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.MOVIE_DB_API_KEY;
console.log(API_KEY);

const getUrl = async (url, options) => {
  const response = await axios.get(url, {
    params: {
      ...options,
      api_key: API_KEY,
    },
  });

  return response.data;
};

app.get('/movies/popular', (req, res) => {
  const url = `${MOVIES_BASE_URL}/movie/popular`;
  getUrl(url)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

app.get('/search', (req, res) => {
  const query = req.query.movie;

  if (!query) {
    res.status(400).send({ error: 'No query string provided' });
  } else {
    const url = `${MOVIES_BASE_URL}/search/movie`;
    const params = { query };
    getUrl(url, params)
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  }
});

app.get('/movie/:id', (req, res) => {
  const url = `${MOVIES_BASE_URL}/movie/${req.params.id}`;
  getUrl(url)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

const port = 8080;
app.listen(port);
console.log('App is listening on port ' + port);
