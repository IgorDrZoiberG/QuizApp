import axios from '../../axios/axiosBase';
import {
    FINISH_QUIZ,
    LOAD_QUIZ_SUCCESS,
    LOAD_QUIZES_END,
    LOAD_QUIZES_ERROR,
    LOAD_QUIZES_START,
    NEXT_QUIZ_QUESTION,
    QUIZ_SET_STATE,
    RETRY
} from "./actionTypes";

const loadQuizes = () => {
    return async dispatch => {
        dispatch(loadQuizStart());
        try {
            const response = await axios.get('/quizes.json');
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: ` Тест№ ${index + 1}`
                })
            });
            dispatch(loadQuizEnd(quizes))
        } catch (e) {
            dispatch(loadQuizError(e))
        }
    }
};

export const loadQuiz = (quizId) => {

    return async dispatch => {
        dispatch(loadQuizStart());
        try {
            const response = await axios.get(`/quizes/${quizId}.json`);
            const quiz = response.data;
            dispatch(loadQuizSuccess(quiz))
        } catch (e) {
            dispatch(loadQuizError(e))
        }
    }
};


export const clickAnswerQuiz = (answerId) => {
    return (dispatch, getState) => {
        const state = getState().quiz;
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return
            }
        }
        const question = state.quiz[state.activeQuestion];
        const results = state.results;


        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerId]: 'success'}, results));
            const timeout = setTimeout(() => {
                if (isQuestionsFinished(state)) {
                    dispatch(finishQuiz({isFinished: true}))
                } else {
                    dispatch(nextQuizQuestion(state.activeQuestion + 1, {answerState: null}))
                }
                clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}, results));
        }
    }
};

function isQuestionsFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length;
}


export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function nextQuizQuestion(activeQuestion, answerState) {
    return {
        type: NEXT_QUIZ_QUESTION,
        activeQuestion,
        answerState
    }
}


export function finishQuiz(isFinished) {
    return {
        type: FINISH_QUIZ,
        isFinished
    }
}


export function loadQuizStart() {
    return {
        type: LOAD_QUIZES_START,

    }
}

export function loadQuizEnd(quizes) {
    return {
        type: LOAD_QUIZES_END,
        quizes
    }
}

export function loadQuizError(e) {
    return {
        type: LOAD_QUIZES_ERROR,
        error: e
    }
}

export function loadQuizSuccess(quiz) {
    return {
        type: LOAD_QUIZ_SUCCESS,
        quiz
    }
}

export function retryQuiz() {
    return {
        type: RETRY,
        activeQuestion: 0,
        answerState : null,
        isFinished: false,
        results: {}

    }
}

export default loadQuizes;




