import React from 'react';
import styles from './Quiz.module.css';
import ActualQuiz from "../../components/ActualQuiz/ActualQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";


class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: {},
            currentQuestion: 0,
            answerState: null,
            isFinished: false,
            quiz: [
                {
                    question: 'Какая пора года самая холодная?',
                    correctAnswer: 3,
                    id: 1,
                    answers: [
                        {text: 'лето', id: 1},
                        {text: 'осень', id: 2},
                        {text: 'зима', id: 3},
                        {text: 'весна', id: 4}
                    ]

                },
                {
                    question: 'Какого цвета крокодил?',
                    correctAnswer: 2,
                    id: 2,
                    answers: [
                        {text: 'красный', id: 1},
                        {text: 'зеленый', id: 2},
                        {text: 'желтый', id: 3},
                        {text: 'белый', id: 4}
                    ],

                }
            ]

        };
    };

    chooseCorrectAnswerHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.currentQuestion];
        const results = this.state.results;


        if (question.correctAnswer === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });
            const timeout = setTimeout(() => {
                if (this.isQuestionsFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({
                        currentQuestion: this.state.currentQuestion + 1,
                        answerState: null
                    });
                }
                clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            });
        }
    };
    isQuestionsFinished = () => {
        return this.state.currentQuestion + 1 === this.state.quiz.length;
    };
    repeatHandle = () => {
      this.setState({
          currentQuestion: 0,
          answerState : null,
          isFinished: false,
          results: {}
      })
    };

    render() {
        return (
            <div className={styles.Quiz}>
                <div className={styles.QuizWrapper}>
                    <h1>Выберите правильный вариант ответа</h1>
                    {this.state.isFinished ?
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            repeat = {this.repeatHandle}

                        />
                        : <ActualQuiz
                            answers={this.state.quiz[this.state.currentQuestion].answers}
                            question={this.state.quiz[this.state.currentQuestion].question}
                            onAnswerClick={this.chooseCorrectAnswerHandler}
                            questionsLength={this.state.quiz.length}
                            answerNumber={this.state.currentQuestion + 1}
                            answerState={this.state.answerState}
                        />

                    }

                </div>
            </div>
        )
    }
}


export default Quiz;