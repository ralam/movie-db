import React from 'react';
import { Link } from 'react-router-dom';
import './MovieDetail.css';

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchMovieDetails(id);
  }

  fetchMovieDetails(id) {
    fetch(`/movie/${id}`)
      .then((response) => response.json())
      .then((data) => this.setState({ movie: data }));
  }

  render() {
    const { movie } = this.state;
    const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w300';
    let movieDetail;
    if (movie) {
      movieDetail = (
        <div className="movie-detail">
          {movie.poster_path ? (
            <img
              className="movie-poster"
              src={`${POSTER_BASE_URL}${movie.poster_path}`}
            />
          ) : (
            <div className="movie-poster placeholder">No image</div>
          )}
          <div className="title">{movie.title}</div>
          <div className="release-date">Released on: {movie.release_date}</div>
          <div className="summary">Summary: {movie.overview}</div>
          <Link className="return-home" to="/">
            Back to home
          </Link>
        </div>
      );
    } else {
      movieDetail = <div>Content loading...</div>;
    }
    return <div className="container">{movieDetail}</div>;
  }
}

export default MovieDetail;
