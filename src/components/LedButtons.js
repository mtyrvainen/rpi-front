import React from 'react'
import { Button, Container, Message } from 'semantic-ui-react'

const LedButtons = ({ buttonsDisabled, buttonTimers, buttonTimeout, handleLedButtonClick, clicks }) => {
  return (
    <>
      <Button
        fluid
        size='large'
        color='red'
        disabled={buttonsDisabled.red}
        onClick={() => handleLedButtonClick('r')}
        label={{ basic: true, color: 'red', pointing: 'left', content: clicks.red }}
        content={!buttonsDisabled.red ? 'Red LED' : buttonTimers.red}
      />
      <Container></Container>
      <Button
        fluid
        size='large'
        color='green'
        disabled={buttonsDisabled.green}
        onClick={() => handleLedButtonClick('g')}
        label={{ basic: true, color: 'green', pointing: 'left', content: clicks.green }}
        content={!buttonsDisabled.green ? 'Green LED' : buttonTimers.green}
      />
      <Container></Container>
      <Button
        fluid
        size='large'
        color='blue'
        disabled={buttonsDisabled.blue}
        onClick={() => handleLedButtonClick('b')}
        label={{ basic: true, color: 'blue', pointing: 'left', content: clicks.blue }}
        content={!buttonsDisabled.blue ? 'Blue LED' : buttonTimers.blue}
      />
      <Container></Container>
      <Message>
        These buttons will turn the server&apos;s LEDs on or off.
        <br /> <br />
        When any user presses a button it will be disabled for all users for the next {buttonTimeout/1000} seconds
      </Message>
    </>
  )
}

export default LedButtons

