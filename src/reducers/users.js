import { RECEIVE_USERS } from '../actions/users'
import { SET_ANSWER, RESET_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function users(state = {}, action) {
    console.log(action)
    switch (action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        case SET_ANSWER :
            return {
                ...state,
                [action.authedUser]: { 
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.option 
                    }
                    
                }
            }
        case RESET_ANSWER :
            let answers = { ...state[action.authedUser].answers }
            delete answers[action.qid]
            return {
                ...state,
                [action.authedUser]: { 
                    ...state[action.authedUser],
                    answers,
                    
                }
            }
        case ADD_QUESTION :
            let questions = state[action.question.author].questions
            questions.push(action.question.id)
            return {
                ...state,
                [action.authedUser]: { 
                    ...state[action.authedUser],
                    questions
                    
                }
            }
        default :
            return state
    }
}