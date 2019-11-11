import React from 'react';
import styles from './Quiz.module.css';
import ActualQuiz from "../../components/ActualQuiz/ActualQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {clickAnswerQuiz, loadQuiz, retryQuiz} from "../../store/actions/quiz";




class Quiz extends React.Component {
    componentDidMount() {
       this.props.loadQuiz(this.props.match.params.id)
    };

  componentWillUnmount() {
      this.props.retryQuiz();
  }

    render() {
        return (
            <div className={styles.Quiz}>
                <div className={styles.QuizWrapper}>
                    <h1>Выберите правильный вариант ответа</h1>
                    {this.props.loading || !this.props.quiz
                        ? <Loader/>
                        : this.props.isFinished ?
                            <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                repeat={this.props.retryQuiz}

                            />
                            : <ActualQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.props.clickAnswerQuiz}
                                questionsLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                answerState={this.props.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        results: state.quiz.results,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        isFinished: state.quiz.isFinished,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
};

const mapDispatchToProps = dispatch => {
return {
    loadQuiz: id => dispatch(loadQuiz(id)),
    clickAnswerQuiz: answerId => dispatch(clickAnswerQuiz(answerId)),
    retryQuiz: ()=> dispatch(retryQuiz())

}
};



export default connect(mapStateToProps, mapDispatchToProps)(Quiz);