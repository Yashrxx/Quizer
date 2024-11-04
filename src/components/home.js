import React,{Fragment} from 'react'
import {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom'
import '@mdi/font/css/materialdesignicons.min.css';
export default function Home() {
  return (
    <Fragment>
        <Helmet><title>Quiz App</title></Helmet>
    <div id="home" >
        <section >
            <div className="flexer">
            <div className='rubics' style={{textAlign:'center'}}>
                <span className="mdi mdi-cube-outline cube"></span>
                <h1>QUIZ APP</h1>
            </div>
            <div className='play-button-container'>
                <Link className='play-button' to="/play/instructions"><div className="ply">Play</div></Link>
            </div>
            <div className="auth-container">
            <div className='auth-container-1'>
                <Link className='auth-button' to="/login">
                <div className='log'>Login</div></Link>
            </div>
            <div className="auth-container-2">
            <Link className='auth-button' to="/signup">
            <div className="sign">Sign up</div></Link>
            </div>
            </div>
            </div>
        </section>
    </div>
    <footer className='foot'>Copyright @Quiz-app |All rights Reserved 16-09-24</footer>
    </Fragment>
  )
}
