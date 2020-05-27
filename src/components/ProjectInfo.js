/* eslint-disable no-trailing-spaces */
import React, { useState } from 'react'
import { Button, Container, Header, Icon, Image, List, Message, Modal, Popup, Segment } from 'semantic-ui-react'

const ProjectInfo = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const handleOpen = () => setModalOpen(true)
  const handleClose = () => setModalOpen(false)

  return(
    <Popup position='top center' content='Information about this project' trigger={
      <Message info>
        <Modal closeOnEscape={true}
          closeOnRootNodeClick={true}
          open={modalOpen}
          onClose={handleClose}
          trigger={<Icon id='info-logo' onClick={handleOpen} name='info circle' size='huge' />} >
          <Modal.Header>Information about the RPi LED Server project</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='small' src='nodejs-new-pantone-black.svg' />
            <Image wrapped size='small' src='React-icon-512px-svg.png' />
            <Image wrapped size='medium' src='python-logo.png' />
            <Image wrapped size='tiny' src='RPi-Logo-Reg-SCREEN.webp' />
            <Modal.Description>
              <Header>Project Information --&gt; What?</Header>
              <p>This project is mainly just a personal one. Mostly meaningless as it is, but is does utilize many different techniques which can be harnessed in very useful ways.</p>
              <p>From your browser you can control the three Raspberry Pi controlled LEDs, which you can see in the camera stream. 
                With the three buttons you can turn the LEDs on/off, and with the Sequence Builder you can submit a sequence of LED flashes of varying durations to the server&apos;s queue. 
                These sequence items are processed from the queue with pre-defined intervals (probably around one minute, depends on the server settings). </p>
              <p>The different controls will be disabled and enabled depending on what the server is doing. During sequence execution the three buttons are disabled (don&apos;t mess with the queue!) and if the queue is full, you can't submit more items to it.</p>

              <Header as='h3'>Project Infromation --&gt; How?</Header>
              <List>
                <List.Item>
                  
                  <List.Content>
                    <List.Header>Node.js + Express + SQLite</List.Header>
                    <List.Description>
                      The backend is powered by Node.js/Express, with a SQLite database. Some remnants of the early REST API are still present, but currently all data flow is handled via Websockets.
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  
                  <List.Content>
                    <List.Header>React + Semantic UI</List.Header>
                    <List.Description>
                    The frontend was built with React and as I am no designer, it was made to look decent with Semantic UI React.
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  
                  <List.Content>
                    <List.Header>Python3</List.Header>
                    <List.Description>
                      The blinking LED part of the project is controlled by a Python service, via Raspberry Pi&apos;s GPIO. As does the client, so does the Python service utilize a Websocket connection to the backend. A pinch of multithreading was needed here also.
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  
                  <List.Content>
                    <List.Header>Raspberry Pi & JSMpeg + ffmpeg</List.Header>
                    <List.Description>
                      Everything described above is running on a Raspberry Pi model 3B. It runs the server app, it controls the camera (with help from JSMpeg & ffmpeg) and the LEDs, runs all the services and still fits into your pocket.
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>

              <Header>Project Information --&gt; Why?</Header>
              <p>The project&apos;s main goals were:    </p>
              <List>
                <List.Item>1. Get hands-on know-how of Node.js and React</List.Item>
                <List.Item>2. Learn about Websockets and real-time web techniques</List.Item>
                <List.Item>3.Get a dedicated web server, which I have full access to</List.Item>
                <List.Item>-  and  -</List.Item>
                <List.Item>4. Make use of my Raspberry Pi</List.Item>
              </List>

              <Message>
                If you want to examine the project more, visit the related <a rel='noopener noreferrer' target='_blank' href='https://github.com/mtyrvainen/rpi-server'>GitHub repos</a>.
              </Message>
              <Message>
                More about me: <a href='http://www.markotyrvainen.fi'>www.markotyrvainen.fi</a>
              </Message>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleClose} primary>
              Back <Icon name='right chevron' />
            </Button>
          </Modal.Actions>
        </Modal>
        <Container style={{ margin: '0.5em' }}>What is this? How was it done? And why??</Container>
      </Message>} />
  )
}

export default ProjectInfo