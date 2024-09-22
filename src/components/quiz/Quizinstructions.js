import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import options from '../../assets/img/nta-mob-1.png';
// import Play from './Play';
import QuestionModal from '../../assets/img/nta-mob-2.png';
import Marker from '../../assets/img/4 marker.jpg';
export default function Quizinstructions() {
  return (
    <Fragment>
      <Helmet><title>Quiz Instructions</title></Helmet>
      <div id="wallpaper">
        <div className="container">
          <div className="heading">
            <h1 className='Rules'>Rules to play the quiz</h1>
            <p>Ensure you read this guide from start to finish</p>
          </div>
          <div className='example'>
            <li>
              The game has a duration of fifteen minutes and
              ends as soon as your time elapses.
            </li>
            <h1>Each game consists of Fifteen Questions</h1>
            <div className="package-1">
              <div className="framework">
                <img src={options} alt="Quetion app option example" />
              </div>
              <div className="comments" id="c">
                <li>Every question contains 4 options</li>
                <li>Each question carries 4 marks</li>
                <li>Zero will be awarded for each wrong answer</li>
                <li>You can Traverse between questions</li>
                <li>Next Button | Next Question</li>
                <li>Previous Button | Previous Question</li>
              </div>
            </div>
          </div>
          {/* <div className="Modalquestion">
            <h1>Modal Question</h1>
            <div className="package-2">
              <div className="framework-1">
                <img src={QuestionModal} alt="Error 404" /></div>
              <div className="comments-1">
                <li>This is a sample Modal Question</li>
                <li>Time will be displayed at the top-right</li>
                <li>Once completed ,You can submit the test</li>
                <li>Response gets submited automatically after timer ends</li>
              </div>
            </div>
          </div> */}
          {/* <div className="marker">
            <div className="internal-mrk">
              <div className="framework-2">
                <img className='marker-1' src={Marker} alt="Error 404" /></div>
              <div className="comments-2">
                <div className="box-1"><div className="green-box"></div>
                  <h3 className='green'>Green Flag | Answered</h3></div>
                <div className="box-2"><div className="red-box"></div>
                  <h3 className='red'>Red Flag | Not Answered</h3></div>
                <div className="box-3">
                  <div className="grey-box"></div>
                  <h3 className='grey'>Grey Flag | Not Visited</h3>
                </div>
              </div>
            </div>
            <li>select the option which best answers the question by clicking (or selecting) it</li>
          </div> */}
          <div className='options'>
            <div className='left'><Link className="Back" to="/quizer"><div className="leave">No,take me back</div></Link></div>
            <div className='right'><Link className="Forward" to="/play/quiz"><div className="continue">Okay, let's do this</div></Link></div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
