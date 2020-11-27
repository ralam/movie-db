import React from 'react';
import './Home.css';

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w200';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      movies: [],
    };
  }

  componentDidMount() {
    this.fetchPopularMovies();
  }

  getUrl = async (url) => {
    return fetch(url);
  };

  handleSearchInputChange = (e) => {
    e.preventDefault();
    const text = e.target.value;
    this.setState(() => ({
      searchInput: text,
    }));
  };

  searchMovies = (e) => {
    e.preventDefault();
    const { searchInput } = this.state;
    if (searchInput) {
      fetch(`/search?movie=${encodeURIComponent(searchInput)}`)
        .then((response) => response.json())
        .then((data) => this.setState({ movies: data.results }));
    } else {
      this.fetchPopularMovies();
    }
  };

  fetchPopularMovies = () => {
    fetch('/movies/popular')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: data.results });
      });
  };

  render() {
    const { movies, searchInput } = this.state;
    let movieList;
    if (movies.length) {
      movieList = movies.map((movie) => {
        return (
          <div className="movie" key={movie.id}>
            {movie.poster_path ? (
              <img
                className="movie-poster"
                src={`${POSTER_BASE_URL}${movie.poster_path}`}
              />
            ) : (
              <div className="movie-poster placeholder">No image</div>
            )}
            <div className="movie-title">{movie.original_title}</div>
          </div>
        );
      });
    } else if (searchInput) {
      movieList = (
        <div className="no-results">
          No results found. Try another search query
        </div>
      );
    } else {
      movieList = <div></div>;
    }
    return (
      <div className="Home">
        <div className="search-bar">
          <input
            className="search-input"
            onChange={(e) => this.handleSearchInputChange(e)}
            type="text"
          />
          <button className="search-btn" onClick={this.searchMovies}>
            Search
          </button>
        </div>
        <div className="movie-list">{movieList}</div>
      </div>
    );
  }
}

export default Home;
