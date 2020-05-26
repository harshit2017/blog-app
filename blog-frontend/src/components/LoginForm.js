import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, username, password }) => {
  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            id='username'
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            id='password'
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Log In</Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm