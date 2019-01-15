import React, { Component } from 'react';
import './navbar.css';

class Navbar extends Component {

    render() {
        return (
            <div className="navbar">
                <div className="navbar-content">
                    <a href="/">
                    <h3 className="logo">Movie App</h3>
                    </a>
                        <input
                            placeholder="Filter results..."
                            type="text"
                            onChange={this.handleSearchFilter}
                        />
                </div>
            </div>
        );
    }

    handleSearchFilter = (e) => {
        let filterMovies = new CustomEvent('movieFilter',{detail: e.target.value});
        document.dispatchEvent(filterMovies);
    }


}

export default Navbar;