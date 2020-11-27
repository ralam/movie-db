import React from 'react';
import { Link } from 'react-router-dom';
import './MovieDetail.css';

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      cast: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchMovieDetails(id);
    this.fetchCast(id);
  }

  fetchMovieDetails(id) {
    fetch(`/movie/${id}`)
      .then((response) => response.json())
      .then((data) => this.setState({ movie: data }));
  }

  fetchCast(id) {
    fetch(`/movie/${id}/credits`)
      .then((response) => response.json())
      .then((data) => this.setState({ cast: data.cast }));
  }

  generateCast() {
    const { cast } = this.state;
    const ACTOR_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';
    if (cast.length) {
      return (
        <div className="cast-list">
          Featuring:
          <ul>
            {cast.map((actor) => (
              <li className="actor" key={actor.id}>
                <span className="name">{actor.name}</span> as{' '}
                <span className="character">{actor.character}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div className="cast-list">No cast details found</div>;
    }
  }

  render() {
    const { movie } = this.state;
    const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w300';
    let movieDetail;
    let cast;
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
          {this.generateCast()}
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
