import React, { Component } from 'react';
import './preview.css';

class Preview extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="moviesPreview">
                    {this.props.handleRenderMovies}
                </div>
            </React.Fragment>
        );
    }
}

export default Preview