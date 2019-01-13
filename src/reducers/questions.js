import { RECEIVE_QUESTIONS, SET_ANSWER, RESET_ANSWER, ADD_QUESTION } from '../actions/questions'
// import authedUser from './authedUser';

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }
        case SET_ANSWER :
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.option]: {
                        ...state[action.qid][action.option],
                        votes: state[action.qid][action.option].votes.concat([action.authedUser])
                    } 
                }
            }
        case RESET_ANSWER :
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.option]: {
                        ...state[action.qid][action.option],
                        votes: state[action.qid][action.option].votes.filter(uid => uid !== action.authedUser)
                    } 
                }
            }
        case ADD_QUESTION :
            return {
                ...state,
                [action.question.id]: action.question
            }
        default :
            return state
    }
}