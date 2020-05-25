import React from 'react'
import { Icon, Image, Label, Message, Segment } from 'semantic-ui-react'

const WebStream = ({ connectedUsers, uptime, clicks }) => {
  return(
    <Segment>
      <Image src='./rpi3b.jpg' size='large' />
      <Message>
        <Label>
          <Icon name='user' />{connectedUsers} online
        </Label>
        <Label>
          <Icon name='time' />{uptime}
        </Label>
        <Label>
          <Icon name='circle' color='red'/>{clicks.red}
        </Label>
        <Label>
          <Icon name='circle' color='green' />{clicks.green}
        </Label>
        <Label>
          <Icon name='circle' color='blue' />{clicks.blue}
        </Label>
      </Message>
    </Segment>
  )
}

export default WebStream
