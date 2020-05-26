import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SignupForm = ({ handleSignup }) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')

    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()
        handleSignup(name, username, email, password, confirmPassword)
        setEmail('')
        setPassword('')
        setUsername('')
        setName('')
        setConfirmPassword('')
        history.push('/')

    }

    return (
        <div>
            <h2>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" name="name" value={name} onChange={({ target }) => setName(target.value)} />
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)} />
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type="password" name="confirmPassword" value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Create Account</Button>
            </Form>
        </div>
    )
}

export default SignupForm