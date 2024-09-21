import { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import React, { Component } from 'react'
// import QuizWrapper from './Play';
import { useLocation } from 'react-router-dom';
const QuizWrapperr = () => {
    const location = useLocation();
    return <Analysis location={location} />;
};

class Analysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberofQuestion: 0,
            numberofAnsweredQuestion: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            fiftyFiftyUsed: 0,
            usedHints: 0,
        }
    }
    componentDidMount() {
        const { state } = this.props.location;
        if (state) {
            this.setState({
                score: (state.score / state.numberofQuestion) * 100,
                numberofQuestion: state.numberofQuestion,
                numberofAnsweredQuestion: state.numberofAnsweredQuestion,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                fiftyFiftyUsed: state.fiftyFiftyUsed,
                usedHints: state.usedHints,
            })
        }
    }
    render() {
        const { state } = this.props.location;
        const userScore = this.state.score;
        let stats, remarks;
        if (userScore < 10) {
            remarks = 'You need to Improve Drastically'
        }
        else if (userScore >= 10 && userScore <= 30) {
            remarks = 'You need to Improve'
        }
        else if (userScore > 30 && userScore <= 50) {
            remarks = 'Better luck next time'
        }
        else if (userScore <= 70 && userScore > 50) {
            remarks = 'You can do Better'
        }
        else if (userScore < 85 && userScore > 70) {
            remarks = 'You can did Great'
        }
        else {
            remarks = 'You are Absolute Genious'
        }
        if (state !== undefined) {
            stats = (
                <Fragment>
                    <div className="parent-class">
                        <div id="content" className="containerx">
                            <div className="successIcon">
                                <span className='mdi mdi-check-circle-outline success-icon'></span>
                            </div>
                            <div className="percentage">
                            <h1>Stats are Available</h1>
                            <h2>{remarks}</h2>
                            <h2>Your score is : {this.state.score.toFixed(0)}&#37;</h2>
                            </div>
                            <div className="statistic">
                                <div className="Questionn">
                                    <span className='statleft'>Total Number of Questions : </span>
                                    <span className='rightx'>{this.state.numberofQuestion}</span>
                                </div>
                                <div className="answeredquestion">
                                    <span className='statleft'>Total Number of AnsweredQuestions : </span>
                                    <span className='rightx'>{this.state.numberofAnsweredQuestion}</span>
                                </div>
                                <div className="correctanswers">
                                    <span className='statleft'>Total Number of CorrectAnswers : </span>
                                    <span className='rightx'>{this.state.correctAnswers}</span>
                                </div>
                                <div className="wronganswers">
                                    <span className='statleft'>Total Number of WrongAnswers : </span>
                                    <span className='rightx'>{this.state.wrongAnswers}</span>
                                </div>
                                <div className="fiftyfiftyused">
                                    <span className='statleft'>Total Number of FiftyfiftyUsed : </span>
                                    <span className='rightx'>{this.props.location.state.fiftyFiftyUsed}</span>
                                </div>
                                <div className="hintsused">
                                    <span className='statleft'>Total Number of HintsUsed : </span>
                                    <span className='rightx'>{this.props.location.state.usedHints}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>)
        }
        else {
            stats = (<h1>No Stats Available</h1>);
        }
        return (
            <Fragment>
                <Helmet><title>Quiz-Report</title></Helmet>
                {stats}
            </Fragment>
        )
    }
}
export default QuizWrapperr;