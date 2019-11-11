import {
    FINISH_QUIZ,
    LOAD_QUIZ_SUCCESS,
    LOAD_QUIZES_END,
    LOAD_QUIZES_ERROR,
    LOAD_QUIZES_START, NEXT_QUIZ_QUESTION,
    QUIZ_SET_STATE, RETRY
} from "../actions/actionTypes";

const initialState = {
    loading: false,
    quizes: [],
    error: null,
    results: {},
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
    quiz: null,

};

const quiz = (state = initialState, action) =>  {
    switch(action.type) {
        case LOAD_QUIZES_START:
            return {
                ...state, loading: true
            };
        case LOAD_QUIZES_END:
            return {
                ...state, loading: false, quizes: action.quizes
            };
        case LOAD_QUIZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            };
        case LOAD_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            };
        case QUIZ_SET_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            };
        case NEXT_QUIZ_QUESTION:
            return {
                ...state, answerState: null, activeQuestion: action.activeQuestion
            };
        case FINISH_QUIZ:
            return {
                ...state, isFinished: true
            };
        case RETRY:
            return {
              ...state,
                activeQuestion: 0,
                answerState : null,
                isFinished: false,
                results: {}
            };



        default:
            return state;
    }

};

export default quiz;