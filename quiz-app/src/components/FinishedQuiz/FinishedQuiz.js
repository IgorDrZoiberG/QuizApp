import React from 'react';
import styles from './FinishedQuiz.module.css';
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

const FinishedQuiz  = props =>{
    const rightAnswers = Object.keys(props.results).reduce((accum, current)=>{
        if (props.results[current] === 'success') {
            accum ++
        }
        return accum;
    }, 0);
    return (
        <div className={styles.FinishedQuiz}>
         <ul>
             {props.quiz.map((quizItem, index)=> {
                 const classes = [
                     'fa',
                     props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                     styles[props.results[quizItem.id]]
                 ];
                 return (
                    <li
                        key={index}
                    >
                        <strong>{index + 1}</strong>.&nbsp;
                        {quizItem.question}
                        <i className={classes.join(' ')}/>
                    </li>
                )
             })
             }

         </ul>
            <p>Правильно {rightAnswers} из {props.quiz.length} </p>
            <div>
                <Button onClick = {props.repeat} disabled = {''} type ='primary'>Повторить </Button>
                <Link to = {'/'}>
                    <Button  disabled = {''} type ='success'>Список тестов </Button>
                </Link>


            </div>
        </div>
    )
};

export default FinishedQuiz;