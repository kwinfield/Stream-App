import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">TubeFeed</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav mr-5">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">All Streams <span className="sr-only">(current)</span></Link>
                    </li>
                </ul>
                <GoogleAuth />
            </div>
        </nav>
     );
}
 
export default Header;