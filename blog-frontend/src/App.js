import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useField } from './hooks'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import User from './components/User'

import loginService from './services/login'
import userService from './services/users'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, addLike, addComment } from './reducers/blogReducer'
import { setCurrentUser, login, logout } from './reducers/currentUserReducer'

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { Navbar, Nav, Table, Container,Button } from 'react-bootstrap'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }


  return (
    <Router>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>

            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>Home</Link>
            </Nav.Link>

            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/users'>Users</Link>
            </Nav.Link>

            <>
              {props.currentUser === null ?
                ''
                : (<>
                  <Nav.Link href='#' as='span'>
                    <em style={padding}>{props.currentUser.name} logged in</em>
                  </Nav.Link>
                  <Nav.Link href='#' as='span'>
                    <Button variant="outline-info" style={padding} onClick={props.handleLogout}>Logout</Button>
                  </Nav.Link>
                </>
                )}
            </>


          </Nav>
        </Navbar.Collapse>
      </Navbar >

      <Route exact path='/' render={() =>
        <Home
          notify={props.notify}
          currentUser={props.currentUser}
          notification={props.notification}
          blogs={props.blogs}
          createBlog={props.createBlog}
          addLike={props.addLike}
          addComment={props.addComment}
          login={props.login}
        />
      } />
      <Route exact path='/users' render={() =>
        <Users
          users={props.users}
          setUser={props.setUsers}
          userById={props.userById}
        />
      } />
      <Route exact path='/users/:id' render={({ match }) =>
        <User user={props.userById(match.params.id)} />
      } />
      <Route exact path='/blogs/:id' render={({ match }) =>
        props.currentUser ? <Blog blog={props.blogById(match.params.id)} addLike={props.addLike} addComment={props.addComment} notify={props.notify} notification={props.notification} />
          : <Redirect to='/' />
      } />
    </Router >
  )
}

const Home = (props) => {
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('url')
  const username = useField('text')
  const password = useField('password')
  const blogFormRef = React.createRef()

  const addBlog = event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
      likes: 0,
      comments: []
    }

    props.createBlog(blogObject)

    props.notify(`a new blog ${newTitle.value} by ${newAuthor.value} is added.`)
    newTitle.reset()
    newAuthor.reset()
    newUrl.reset()
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      username.reset()
      password.reset()

      props.login(user)
    } catch (exception) {
      username.reset()
      password.reset()
      props.notify('wrong username or password', 'error')
    }
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='Login'>
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm
        onSubmit={addBlog}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
      />
    </Togglable>
  )

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={props.notification} />

      {props.currentUser === null ? (
        loginForm()
      ) : (
          <div>
            <div>{blogForm()}</div>
            <Table striped>
              <tbody>
                {props.blogs.map(blog => (
                  <tr key={blog.id}>
                    <td>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
    </div>
  )
}

const Users = (props) => {

  return (
    <div>
      <h1>Users</h1>

      <Table striped>
        <tbody>
          <tr>
            <th>Added By</th>
            <th>Blogs Created</th>
          </tr>
          {props.users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  )
}

const App = (props) => {
  const [users, setUsers] = useState([])
  // console.log('props.like-', props.addLike)

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  useEffect(() => {
    props.initializeBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.setCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const notify = (message, notifType = 'success') => {
    props.setNotification(message, notifType, 10)
  }

  const handleLogout = async event => {
    event.preventDefault()
    props.logout()
    props.setCurrentUser()
  }

  const userById = (id) => {
    return users.find(user => user.id === id)
  }

  const blogById = (id) => {
    return props.blogs.find(blog => blog.id === id)
  }

  // console.log('blogById: ', blogById('5c745f0cde9fe11f2e87046b'))

  // const padding = { padding: 5 }

  return (
    <Container fluid>
      <Menu
        notify={notify}
        currentUser={props.currentUser}
        handleLogout={handleLogout}
        notification={props.notification}
        blogs={props.blogs}
        createBlog={props.createBlog}
        addLike={props.addLike}
        addComment={props.addComment}
        login={props.login}
        users={users}
        setUser={setUsers}
        userById={userById}
        blogById={blogById}
      />
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  createBlog,
  addLike,
  addComment,
  setNotification,
  setCurrentUser,
  login,
  logout
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp