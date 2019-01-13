import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SET_ANSWER = 'SET_ANSWER'
export const RESET_ANSWER = 'RESET_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion(question, authedUser) {
    return {
        type: ADD_QUESTION,
        question,
        authedUser
    }
}

export function handleAddQuestion(option1, option2) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestion({
            optionOneText: option1,
            optionTwoText: option2,
            author: authedUser
        })
        .then((question) => dispatch(addQuestion(question, authedUser)))
        .then(() => dispatch(hideLoading()))
    }
}

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function setAnswer({id, authedUser, option}) {
    return {
        type: SET_ANSWER,
        qid: id,
        authedUser,
        option
    }
}

function resetAnswer({id, authedUser}) {
    return {
        type: RESET_ANSWER,
        qid: id,
        authedUser
    }
}

export function handleSetAnswer(info) {
    return dispatch => {
        dispatch(setAnswer(info))

        return saveQuestionAnswer(info)
            .catch((e) => {
                console.warn('Error in handleSetAnswer ', e)
                dispatch(resetAnswer(info))
                alert('There was an error setting the answer. Try again.')
            })
    }
}