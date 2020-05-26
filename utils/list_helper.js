const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const reducer = (sum, item) => { return sum + item }
    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return {}
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    const favBlog = blogs.find((blog) => {
        return blog.likes === maxLikes
    })

    return favBlog
}



module.exports = {
    totalLikes,
    favoriteBlog,
}