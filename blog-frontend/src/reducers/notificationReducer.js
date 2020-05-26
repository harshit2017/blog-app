const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            const newState = action.data
            return newState
        case 'RESET_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const setNotification = (message, notifType, duration) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                message,
                notifType
            }
        })
        setTimeout(() => {
            dispatch({
                type: 'RESET_NOTIFICATION'
            })
        }, duration * 1000)
    }
}

export default notificationReducer