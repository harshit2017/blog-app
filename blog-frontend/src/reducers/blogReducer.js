import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action ', action)

    switch (action.type) {
        case 'LIKE':
            {
                let id = action.data
                let blogToChange = state.find(blog => blog.id === id)
                let changedBlog = {
                    ...blogToChange,
                    likes: blogToChange.likes + 1
                }
                blogService.update(id, changedBlog)
                // console.log('chetan')
                return state
                    .map(blog => (blog.id !== id ? blog : changedBlog))
                    .sort((a, b) => b.likes - a.likes)
            }
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'COMMENT': {
            let id = action.data.id
            let blogToChange = state.find(blog => blog.id === id)
            let upDateComments = blogToChange.comments.concat(action.data.comment)
            // upDateComments.concat(action.data.comment)
            console.log('updatedComments', upDateComments)
            let changedBlog = {
                ...blogToChange,
                comments: upDateComments
            }
            blogService.addComment(id, changedBlog)
            return state
                .map(blog => (blog.id !== id ? blog : changedBlog))
                .sort((a, b) => b.likes - a.likes)
        }
        case 'INIT_BLOGS':
            return action.data.sort((a, b) => b.likes - a.likes)
        default:
            return state
    }
}

export const createBlog = (blogObject) => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const addLike = (id) => {
    return async dispatch => {
        dispatch({
            type: 'LIKE',
            data: id
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addComment = (commentObj) => {
    return async dispatch => {
        dispatch({
            type: 'COMMENT',
            data: commentObj
        })
    }
}

export default blogReducer