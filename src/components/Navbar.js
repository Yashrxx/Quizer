import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export default function Navbar(props) {
  return (
    <nav style={{backgroundColor:'black'}} className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} `}>
    {/* <h1 className="Hello world"  >{props.title}</h1> */}
  <div className="container-fluid ">
    <Link className="navbar-brand" to="/quizer">{props.title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link id="let" className="nav-link active" aria-current="page" to="/quizer">Home</Link>
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
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  )
}
Navbar.propTypes={title : PropTypes.string,
  aboutText : PropTypes.string
}