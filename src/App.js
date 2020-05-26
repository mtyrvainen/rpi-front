import React, { useState, useEffect } from 'react'
import './App.css'
import { Container, Divider, Grid, Header, Icon, Message, Popup } from 'semantic-ui-react'
import { createRandomUsername } from './util/randomUser'
import LedButton from './components/LedButtons'
import WebStream from './components/WebStream'
import QueueList from './components/QueueList'
import QueueBuilder from './components/QueueBuilder'

function App({ websocket }) {
  /* Webcam stream from test.html:
  <canvas id="video-canvas"></canvas>
	<script type="text/javascript" src="jsmpeg.min.js"></script>
	<script type="text/javascript">
		var canvas = document.getElementById('video-canvas');
		var url = 'ws://'+document.location.hostname+':8082/';
		var player = new JSMpeg.Player(url, {canvas: canvas});
	</script>
  */
  const [redButtonDisabled, setRedButtonDisabled] = useState(false)
  const [blueButtonDisabled, setBlueButtonDisabled] = useState(false)
  const [greenButtonDisabled, setGreenButtonDisabled] = useState(false)
  const [queueBuilderDisabledfromServer, setQueueBuilderDisabledfromServer] = useState(false)
  const [queueBuilderDisabledLocally, setQueueBuilderDisabledLocally] = useState(true)
  const [queue, setQueue] = useState([])
  const [username, setUsername] = useState('')
  const [maxQueueLength, setMaxQueueLength] = useState('')
  const [maxTimePerLed, setMaxTimePerLed] = useState('')
  const [minTimePerLed, setMinTimePerLed] = useState('')
  const [runningItem, setRunningItem] = useState([])
  const [runningItemText, setRunningItemText] = useState('')
  const [maxLedsPerQueue, setMaxLedsPerQueue] = useState('')
  const [redTimer, setRedTimer] = useState('...')
  const [greenTimer, setGreenTimer] = useState('...')
  const [blueTimer, setBlueTimer] = useState('...')
  const [queueTimer, setQueueTimer] = useState('...')
  const [redClickAmount, setRedClickAmount] = useState(0)
  const [blueClickAmount, setBlueClickAmount] = useState(0)
  const [greenClickAmount, setGreenClickAmount] = useState(0)
  //TODO: implement logging
  const [logMessage, setLogMessage] = useState(['Client initializing...'])
  const [connectedClients, setConnectedClients] = useState(1)
  const [uptime, setUptime] = useState('...')
  const [buttonTimeout, setButtonTimeOut] = useState('')

  websocket.onopen = (e) => {
    console.log('[onopen] Connection established')
    console.log('e:', e)
    setUsername(createRandomUsername())
    websocket.send('{ "welcome": "Client has joined the meeting!" }')
  }

  useEffect(() => {
    const timer = redTimer !== '...' && redTimer > 0 && setInterval(() => setRedTimer(redTimer - 1), 1000)
    return () => clearInterval(timer)
  }, [redTimer])

  useEffect(() => {
    const timer = greenTimer !== '...' && greenTimer > 0 && setInterval(() => setGreenTimer(greenTimer - 1), 1000)
    return () => clearInterval(timer)
  }, [greenTimer])

  useEffect(() => {
    const timer = blueTimer !== '...' && blueTimer > 0 && setInterval(() => setBlueTimer(blueTimer - 1), 1000)
    return () => clearInterval(timer)
  }, [blueTimer])

  useEffect(() => {
    const timer = queueTimer !== '...' && queueTimer > 0 && setInterval(() => setQueueTimer(queueTimer - 1), 1000)
    return () => clearInterval(timer)
  }, [queueTimer])

  const handleIncomingMsg = (jsonMsg) => {
    //TODO: ALL JSON MSG PARSING
    if (jsonMsg.type === 'clientInitialData') {
      console.log('Received initial data', jsonMsg)
      //TODO: Parse Initial Values
      //TODO: receive runningItem info from server
      setRedButtonDisabled(!jsonMsg.redButton)
      setGreenButtonDisabled(!jsonMsg.greenButton)
      setBlueButtonDisabled(!jsonMsg.blueButton)
      setQueue(jsonMsg.queue)
      setMaxQueueLength(jsonMsg.queueConstraints.maxQueueLength)
      setMaxLedsPerQueue(jsonMsg.queueConstraints.maxLedsPerQueue)
      setMaxTimePerLed(jsonMsg.queueConstraints.maxTimePerLed/1000)
      setMinTimePerLed(jsonMsg.queueConstraints.minTimePerLed/1000)
      setRunningItemText('Waiting for next sequence...')
      setQueueBuilderDisabledfromServer(jsonMsg.queueBuilderDisabled)
      setRedClickAmount(jsonMsg.clickAmounts.redClicks)
      setGreenClickAmount(jsonMsg.clickAmounts.greenClicks)
      setBlueClickAmount(jsonMsg.clickAmounts.blueClicks)
      setUptime(jsonMsg.serverUptime)
      setButtonTimeOut(jsonMsg.buttonTimeout)
      setLogMessage('Client ready!')
    } else if (jsonMsg.type === 'disableButton') {
      console.log('disabling button', jsonMsg.color)
      switch (jsonMsg.color) {
      case 'r':
        setRedButtonDisabled(true)
        setRedTimer(jsonMsg.timeOut/1000)
        break
      case 'g':
        setGreenButtonDisabled(true)
        setGreenTimer(jsonMsg.timeOut/1000)
        break
      case 'b':
        setBlueButtonDisabled(true)
        setBlueTimer(jsonMsg.timeOut/1000)
        break
      case 'all':
        setRedButtonDisabled(true)
        setGreenButtonDisabled(true)
        setBlueButtonDisabled(true)
        setRedTimer('Exeuting sequence')
        setGreenTimer('Exeuting sequence')
        setBlueTimer('Exeuting sequence')
        break
      default:
        console.log('Error: not proper color')
        break
      }
    } else if (jsonMsg.type === 'enableButton') {
      console.log('enabling button', jsonMsg.color)
      switch (jsonMsg.color) {
      case 'r':
        setRedButtonDisabled(false)
        break
      case 'g':
        setGreenButtonDisabled(false)
        break
      case 'b':
        setBlueButtonDisabled(false)
        break
      case 'all':
        setRedButtonDisabled(false)
        setGreenButtonDisabled(false)
        setBlueButtonDisabled(false)
        setQueueTimer(jsonMsg.timeOut/1000)
        setRunningItem([])
        break
      default:
        console.log('Error: not proper color')
        break
      }
    } else if (jsonMsg.type === 'newQueueItem') {
      setQueue([ ...queue, jsonMsg.queueItem ])
    } else if (jsonMsg.type === 'processNextInQueue'){
      console.log('processNextInQueue', jsonMsg.queueItem)
      setRunningItem([ jsonMsg.queueItem ])
      queue.shift()
      setQueue([ ...queue ])
    } else if (jsonMsg.type === 'disableQueueBuilder') {
      setQueueBuilderDisabledfromServer(true)
    } else if (jsonMsg.type === 'enableQueueBuilder') {
      setQueueBuilderDisabledfromServer(false)
    } else if (jsonMsg.type === 'singleClickAmounts') {
      console.log('singleClickAmt', jsonMsg)
      setRedClickAmount(jsonMsg.clickData.redClicks)
      setGreenClickAmount(jsonMsg.clickData.greenClicks)
      setBlueClickAmount(jsonMsg.clickData.blueClicks)
    } else if (jsonMsg.type === 'connectedClientsAmount') {
      setConnectedClients(jsonMsg.connectedClients)
    } else {
      console.log('Not yet handled:', jsonMsg.type)
    }
  }

  websocket.onmessage = (event) => {
    //TODO: try catch for proper JSON
    const jsonMsg = JSON.parse(event.data)
    console.log(`[message] Data received from server: ${event.data}`)
    console.log('json', jsonMsg)
    //TODO: check that key 'type' exists
    handleIncomingMsg(jsonMsg)
  }

  const ledButtonClick = (colorChar) => {
    console.log(`Clicked: ${colorChar}`)
    websocket.send(`{ "type": "ledSingleClick", "color": "${colorChar}", "user": "${username}" }`)
  }

  const queueClick = (ledColors, ledTimes) => {
    console.log('ledcolors', ledColors, 'ledtimes', ledTimes)
    const msg = {
      type: 'ledQueue',
      colors: [],
      times: [],
      user: username
    }

    ledColors.forEach( (color, i) => {
      if (color === 'red' || color === 'green' || color === 'blue') {
        msg.colors.push(ledColors[i].slice(0, 1))
        msg.times.push(Number(ledTimes[i]))
      }
    })

    console.log('msg', msg)
    websocket.send(JSON.stringify(msg))
    //websocket.send(`{ "type": "ledQueue", "colors": ["b", "g", "r", "b", "g", "r", "r"], "times": [0.1, 0.5, 0.3, 0.3, 0.2, 0.1, 0.1], "user": "${username}" }`)
  }

  return (
    <Container>
      <Grid stackable centered columns={4}>
        <Grid.Row centered columns={1}>
          <Grid.Column></Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Header as="h2" textAlign="center">
          RPi LED Server - {username}
          </Header>
          <Divider />
          <Grid.Column width={6}><Message id='code-font'>{logMessage}</Message></Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={7}>
            <WebStream connectedUsers={connectedClients} uptime={uptime} clicks={{ red: redClickAmount, green: greenClickAmount, blue: blueClickAmount }} queues='7'  />
          </Grid.Column>
          <Grid.Column width={3}>
            <LedButton buttonsDisabled={{ red: redButtonDisabled, green: greenButtonDisabled, blue: blueButtonDisabled }} buttonTimeout={buttonTimeout} buttonTimers={{ red: redTimer, green: greenTimer, blue: blueTimer }} ledButtonClick={ledButtonClick} />
          </Grid.Column>
          <Grid.Column width={2}>
            <Message info>
              <Popup position='left center' content='Information about this project' trigger={<Icon onClick={() => alert('blaa')} id='info-logo' name='info circle' size='huge' />} />
              <Container style={{ margin: '0.5em' }}>What is this? How was it done? And why??</Container>
            </Message>
            <Message info>
              <Popup position='left center' content='Developer&apos;s homepage: www.markotyrvainen.fi' trigger={<Icon id='info-logo' onClick={() => window.open('http://www.markotyrvainen.fi')} name='user circle outline' size='huge' />} />
              <Container style={{ margin: '0.5em' }}>Who made this?</Container>
            </Message>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4}>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column width={4}>
            <QueueList queue={queue} runningItem={runningItem} runningItemText={runningItemText} maxQueueLength={maxQueueLength} queueTimer={queueTimer} />
          </Grid.Column>
          <Grid.Column width={8}>
            <QueueBuilder queueClick={queueClick} queueBuilderDisabled={{ fromServer: queueBuilderDisabledfromServer, locally: queueBuilderDisabledLocally }} setQueueBuilderDisabledLocally={setQueueBuilderDisabledLocally} maxLedsPerQueue={maxLedsPerQueue} maxTimePerLed={maxTimePerLed} minTimePerLed={minTimePerLed} />
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default App
