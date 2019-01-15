import React, { Component } from 'react';
import './App.css';

import Navbar from './components/navbar/navbar.js'
import Preview from './components/preview/preview.js'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      filter: '',
      currentMovie: null,
    };

    document.addEventListener('movieFilter', (e) => {
      this.setState({filter: e.detail});
    });

  }

  componentDidMount() {

    fetch('/api/movies.json')
        .then(res => res.json())
        .then(moviesList =>
            this.setState({movies: moviesList})
        );
  }

  render() {

    const renderMovies = this.state.movies
        .filter(m => m.title.toLowerCase().includes(this.state.filter.toLowerCase()))
        .map((movie, index) =>
        <div className={`${movie.id === this.state.currentMovie ? 'moviePreview selected' : 'moviePreview' }`}
             key={index}
             onClick={() => this.handleClick(movie)}>
            <div className="moviePreviewHeader">
                <h3>{movie.title}</h3>
                <p>{movie.dateRelease}</p>
            </div>
            <div>
                <img className={`${movie.id === this.state.currentMovie ? 'greyScale' : '' }`} src={movie.poster}/>
                <button
                    onClick={() => this.handleEdit(movie)}
                    className={`${movie.id === this.state.currentMovie ? 'btn' : 'btn hide' }`}
                >Edit</button>
            </div>
        </div>);

    return (
      <div className="App">
        <Navbar />
        <div className="wrapper">
            <Preview handleRenderMovies={renderMovies}/>
            <div className="infoMovie">
                <p>Info Movies</p>
            </div>
        </div>
      </div>
    );
  }

    handleClick = (movie) => {
        this.state.currentMovie === movie.id ? this.setState({currentMovie: null}) :
        this.setState({currentMovie: movie.id})
        document.querySelector('.infoMovie').innerHTML = `
        <h3>${movie.title}</h3>
        <p>${movie.dateRelease}</p>
        <p>${movie.description}</p>
        `
    }
    handleEdit = (movie) => {
        console.log(movie)
        document.querySelector('.infoMovie').innerHTML = `
        <form>
          <label>
            Title:
            <input type="text" name="title" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        `
    }



}

export default App;





