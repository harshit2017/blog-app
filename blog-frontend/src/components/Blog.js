import React from 'react'
import Notification from './Notification'
import { useField } from '../hooks/index'

import { Form, Button } from 'react-bootstrap'
import { FaThumbsUp } from 'react-icons/fa'

const Blog = (props) => {

  const content = useField("text")
  const formMargin = {
    marginTop: 50
  }

  const margin = {
    marginTop: 50
  }

  let name = ''
  if (props.blog === undefined) {
    return null
  }
  if (props.blog.user) {
    name = props.blog.user.name
  }

  const likeBlog = async blog => {
    props.addLike(blog.id)
    props.notify(`blog ${blog.title} by ${blog.author} liked!`)
  }

  const createComment = event => {
    event.preventDefault()

    const commentObject = {
      comment: content.value,
      id: props.blog.id
    }
    console.log('blog component', props)
    props.addComment(commentObject)

    props.notify(
      "a new comment was added!"
    )

    content.reset()
  }

  return (
    <div>

      <Notification message={props.notification} />

      <h3>{props.blog.title} by {props.blog.author}</h3>

      <a href={props.blog.url}>{props.blog.url}</a>
      <br />
      {props.blog.likes} likes
      <Button variant="link" size="sm" onClick={() => likeBlog(props.blog)}><FaThumbsUp /></Button>
      <br />
      Added by {name}
      <div style={formMargin}>
        <h2>New Comment</h2>
        <Form onSubmit={createComment}>
          <Form.Group>
            <Form.Control
              type={content.type}
              value={content.value}
              onChange={content.onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Add Comment</Button>

        </Form>
      </div>
      <div style={margin}>
        <h2>Comments</h2>
        <ul>
          {props.blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog