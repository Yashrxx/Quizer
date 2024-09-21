import React from 'react';
import correctSound from '../../../assets/img/554055__gronkjaer__rightanswer.mp3';
import wrongSound from '../../../assets/img/554055__gronkjaer__rightanswer.mp3';
import buttonSound from '../../../assets/img/554055__gronkjaer__rightanswer.mp3';

const QuizApp = () => {
    const playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            playSound(correctSound);
        } else {
            playSound(wrongSound);
        }
    };

    const handleButtonClick = () => {
        playSound(buttonSound);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Start Quiz</button>
            {/* Example answers */}
            <button onClick={() => handleAnswer(true)}>Correct Answer</button>
            <button onClick={() => handleAnswer(false)}>Wrong Answer</button>
        </div>
    );
};

export default QuizApp;