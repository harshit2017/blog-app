import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  console.log(props)

  const variant = props.message.notifType === 'error' ? 'danger' : 'success'

  return <Alert variant={variant}>{props.message.message}</Alert>
}

export default Notification