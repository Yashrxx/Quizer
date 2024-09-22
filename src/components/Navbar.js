import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <nav style={{ backgroundColor: '#14141' }} className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} `}>
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/quizer">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link style={{ color: "white" }} className="nav-link active" aria-current="page" to="/quizer">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/play/instructions">Instructions</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/play/quiz">PlayGame</Link>
            </li>
            <li className="nav-item">
              <Link style={{ fontWeight: "100", color: "grey" }} className="nav-link disabled" aria-disabled="true" to="/">{props.aboutText}</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
Navbar.propTypes = {
  title: PropTypes.string,
  aboutText: PropTypes.string,
  mode: PropTypes.string
}