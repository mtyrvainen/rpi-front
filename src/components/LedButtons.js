import React from 'react'
import { Button, Container, Message } from 'semantic-ui-react'

const LedButton = ({ buttonsDisabled, buttonTimers, buttonTimeout, ledButtonClick }) => {
  return (
    <>
      <Button fluid size='large' color='red' disabled={buttonsDisabled.red} onClick={() => ledButtonClick('r')}>{!buttonsDisabled.red ? 'Red LED' : buttonTimers.red}</Button>
      <Container></Container>
      <Button fluid size='large' color='green' disabled={buttonsDisabled.green} onClick={() => ledButtonClick('g')}>{!buttonsDisabled.green ? 'Green LED' : buttonTimers.green}</Button>
      <Container></Container>
      <Button fluid size='large' color='blue' disabled={buttonsDisabled.blue} onClick={() => ledButtonClick('b')}>{!buttonsDisabled.blue ? 'Blue LED' : buttonTimers.blue}</Button>
      <Container></Container>
      <Message>
            These buttons will turn the server&apos;s LEDs on or off. <br /> <br />When any user presses a button it will be disabled for all users for the next {buttonTimeout/1000} seconds
      </Message>
    </>
  )
}

export default LedButton

