import React from 'react'
import { Icon, Label, Message, Segment } from 'semantic-ui-react'
import JSMpegPlayer from './JSMpegPlayer'
import '../App.css'

const WebStream = ({ connectedUsers, uptime, clicks }) => {
  /* Webcam stream from test.html:

	<script type="text/javascript" src="jsmpeg.min.js"></script>
	<script type="text/javascript">
		var canvas = document.getElementById('video-canvas');
		var url = 'ws://'+document.location.hostname+':8082/';
		var player = new JSMpeg.Player(url, {canvas: canvas});
  </script>

  <Image src='./rpi3b.jpg' size='large' />
  */
  //let canvas = document.getElementById('video-canvas')
  //let  player = new jsmpeg.Player(url, {canvas: canvas});

  //var player = new jsmpeg(streamSocket , { canvas: canvas })

  return(
    <Segment>
      <JSMpegPlayer wrapperClassName='video-wrapper' videoUrl={'ws://tyrvainen.hopto.org:8082'} />
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
