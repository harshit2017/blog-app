import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import currentUserReducer from './reducers/currentUserReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    currentUser: currentUserReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store