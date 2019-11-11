import {CREATE_QUIZ_QUESTION, RESET_QUIZ} from "./actionTypes";
import axios from '../../axios/axiosBase';


export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuiz() {
 return {
     type: RESET_QUIZ
 }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('/quizes.json', getState().create.quiz);
        dispatch(resetQuiz())
    }
}