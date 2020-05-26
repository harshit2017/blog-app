import blogService from '../services/blogs'
// import { useHistory } from 'react-router-dom'

const initialState = null

const currentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            const newUserFromStorage = action.data
            return newUserFromStorage
        case 'LOGIN':
            const newUserFromLogin = action.data
            return newUserFromLogin
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const setCurrentUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
            dispatch({
                type: 'SET_CURRENT_USER',
                data: user
            })
            blogService.setToken(user.token)
        }
    }
}

export const login = (user) => {
    return async dispatch => {
        dispatch({
            type: 'LOGIN',
            data: user
        })

        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
        blogService.setToken(user.token)
    }
}

export const logout = () => {

    return async dispatch => {
        
        dispatch({
            type: 'LOGOUT'
        })
        window.localStorage.clear()
        blogService.setToken('')
    }
}

export default currentUserReducer