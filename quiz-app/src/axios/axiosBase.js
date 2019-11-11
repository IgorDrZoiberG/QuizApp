import axios from 'axios';

export default axios.create({
    baseURL: 'https://quizapp-c3110.firebaseio.com/'
})