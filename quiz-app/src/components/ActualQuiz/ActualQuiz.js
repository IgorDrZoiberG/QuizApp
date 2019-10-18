import React from 'react';
import styles from './ActualQuiz.module.css';
import AnswersList from "../AnswersList/AnswersList";

const ActualQuiz = props => {
    return (
        <div className={styles.ActualQuiz}>
            <p className={styles.Question}>
            <span>
                <strong>{props.answerNumber}</strong>&nbsp;
                {props.question}
            </span>
                <small>{props.answerNumber} из {props.questionsLength}</small>
            </p>
            <AnswersList
                answers = {props.answers}
                onAnswerClick = {props.onAnswerClick}
                answerState = {props.answerState}
            />
        </div>
    )
};

export default ActualQuiz;