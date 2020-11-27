import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home/Home';
import MovieDetail from './components/movieDetail/MovieDetail';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/movie/:id" component={MovieDetail} />
      </Router>
    );
  }
}

export default App;
