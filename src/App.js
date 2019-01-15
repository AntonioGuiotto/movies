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
        <div className={`${this.state.currentMovie !== null && movie.id === this.state.currentMovie.id ? 'moviePreview selected' : 'moviePreview' }`}
             key={index}
             onClick={() => this.handleClick(movie)}>
            <div className="moviePreviewHeader">
                <h3>{movie.title}</h3>
                <p>{movie.dateRelease}</p>
            </div>
            <div>
                <img className={`${this.state.currentMovie !== null && movie.id === this.state.currentMovie.id ? 'greyScale' : '' }`} src={movie.poster}/>
            </div>
        </div>);

    return (
      <div className="App">
        <Navbar />
        <div className="wrapper">
            <Preview handleRenderMovies={renderMovies}/>
            <div className="infoMovie">
                {this.state.currentMovie && renderMovieInfo(this.state.currentMovie)}
            </div>

        </div>
      </div>
    );
  }

    handleClick = (movie) => {

            console.log('handleClick')
        this.state.currentMovie &&
        this.state.currentMovie.id === movie.id
        ?
        this.setState({currentMovie: null})
        :
        this.setState({currentMovie: movie})

    }





}

const renderMovieInfo = (movie) =>
    <React.Fragment>
        <h3>{movie.title}</h3>
        <p>{movie.dateRelease}</p>
        <p>{movie.description}</p>
    </React.Fragment>


export default App;





