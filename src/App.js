import React, { useState, useEffect } from 'react'
import './App.css'
import { Container, Divider, Grid, Header, Message } from 'semantic-ui-react'
import { createRandomUsername } from './util/randomUser'
import LedButtons from './components/LedButtons'
import WebStream from './components/WebStream'
import QueueList from './components/QueueList'
import QueueBuilder from './components/QueueBuilder'
import ProjectInfo from './components/ProjectInfo'
import DeveloperInfo from './components/DeveloperInfo'
import LostConnectionModal from './components/LostConnectionModal'

function App({ websocket }) {
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
  const [connectionModalOpen, setConnectionModalOpen] = useState(false)

  websocket.onopen = (e) => {
    console.log('[onopen] Connection established')
    console.log('e:', e)
    setUsername(createRandomUsername())
  }

  websocket.onclose = (e) => {
    console.log('websocket connection terminated', e)
    setRedButtonDisabled(true)
    setGreenButtonDisabled(true)
    setBlueButtonDisabled(true)
    setQueueBuilderDisabledfromServer(true)
    setLogMessage('Connection lost. Please refresh the window.')
    setConnectionModalOpen(true)
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


  const handleInitialData = (msg) => {
    console.log('received: initial data', msg)
    //TODO: Parse Initial Values
    //TODO: receive runningItem info from server
    setRedButtonDisabled(!msg.redButton)
    setGreenButtonDisabled(!msg.greenButton)
    setBlueButtonDisabled(!msg.blueButton)
    setQueueBuilderDisabledfromServer(msg.queueBuilderDisabled)

    setMaxQueueLength(msg.queueConstraints.maxQueueLength)
    setMaxLedsPerQueue(msg.queueConstraints.maxLedsPerQueue)
    setMaxTimePerLed(msg.queueConstraints.maxTimePerLed/1000)
    setMinTimePerLed(msg.queueConstraints.minTimePerLed/1000)

    setQueue(msg.queue)
    setRedClickAmount(msg.clickAmounts.redClicks)
    setGreenClickAmount(msg.clickAmounts.greenClicks)
    setBlueClickAmount(msg.clickAmounts.blueClicks)
    setUptime(msg.serverUptime)
    setButtonTimeOut(msg.buttonTimeout)

    setRunningItemText('Waiting for next sequence...')
    setLogMessage('Client ready!')
  }

  const handleButtonDisable = (msg) => {
    console.log('received: disable button', msg.color)
    switch (msg.color) {
    case 'r':
      setRedButtonDisabled(true)
      setRedTimer(msg.timeOut/1000)
      break
    case 'g':
      setGreenButtonDisabled(true)
      setGreenTimer(msg.timeOut/1000)
      break
    case 'b':
      setBlueButtonDisabled(true)
      setBlueTimer(msg.timeOut/1000)
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
  }

  const handleEnableButton = (msg) => {
    console.log('received: enable button', msg.color)
    switch (msg.color) {
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
      setQueueTimer(msg.timeBetweenExecutions/1000)
      setRunningItem([])
      break
    default:
      console.log('Error: not proper color')
      break
    }
  }

  const handleIncomingMsg = (jsonMsg) => {
    //TODO: ALL JSON MSG PARSING
    if (jsonMsg.type === 'clientInitialData') {
      handleInitialData(jsonMsg)
    } else if (jsonMsg.type === 'disableButton') {
      handleButtonDisable(jsonMsg)
    } else if (jsonMsg.type === 'enableButton') {
      handleEnableButton(jsonMsg)
    } else if (jsonMsg.type === 'newQueueItem') {
      console.log('received: new queue item', jsonMsg.queueItem)
      setQueue([ ...queue, jsonMsg.queueItem ])
    } else if (jsonMsg.type === 'processNextInQueue'){
      console.log('received: processNextInQueue', jsonMsg.queueItem)
      setRunningItem([ jsonMsg.queueItem ])
      queue.shift()
      setQueue([ ...queue ])
    } else if (jsonMsg.type === 'disableQueueBuilder') {
      setQueueBuilderDisabledfromServer(true)
    } else if (jsonMsg.type === 'enableQueueBuilder') {
      setQueueBuilderDisabledfromServer(false)
    } else if (jsonMsg.type === 'singleClickAmounts') {
      setRedClickAmount(jsonMsg.clickData.redClicks)
      setGreenClickAmount(jsonMsg.clickData.greenClicks)
      setBlueClickAmount(jsonMsg.clickData.blueClicks)
    } else if (jsonMsg.type === 'connectedClientsAmount') {
      setConnectedClients(jsonMsg.connectedClients)
    } else {
      console.log('ERROR: Unhandled msg type:', jsonMsg.type)
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

  const handleLedButtonClick = (colorChar) => {
    console.log(`Sending: clicked ${colorChar}`)
    websocket.send(`{ "type": "ledSingleClick", "color": "${colorChar}", "user": "${username}" }`)
  }

  const handleQueueClick = (ledColors, ledTimes) => {
    console.log('Sending: ledcolors', ledColors, 'ledtimes', ledTimes)
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
            <WebStream
              connectedUsers={connectedClients}
              uptime={uptime}
              clicks={{ red: redClickAmount, green: greenClickAmount, blue: blueClickAmount }}
              queues='7'
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <LedButtons
              buttonsDisabled={{ red: redButtonDisabled, green: greenButtonDisabled, blue: blueButtonDisabled }}
              clicks={{ red: redClickAmount, green: greenClickAmount, blue: blueClickAmount }}
              buttonTimeout={buttonTimeout}
              buttonTimers={{ red: redTimer, green: greenTimer, blue: blueTimer }}
              handleLedButtonClick={handleLedButtonClick}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <ProjectInfo />
            <DeveloperInfo />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4}>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column width={4}>
            <QueueList
              queue={queue}
              runningItem={runningItem}
              runningItemText={runningItemText}
              maxQueueLength={maxQueueLength}
              queueTimer={queueTimer}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <QueueBuilder
              handleQueueClick={handleQueueClick}
              queueBuilderDisabled={{ fromServer: queueBuilderDisabledfromServer, locally: queueBuilderDisabledLocally }}
              setQueueBuilderDisabledLocally={setQueueBuilderDisabledLocally}
              maxLedsPerQueue={maxLedsPerQueue !== '' ? maxLedsPerQueue : 1}
              maxTimePerLed={maxTimePerLed}
              minTimePerLed={minTimePerLed}
            />
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid.Row>
      </Grid>

      <LostConnectionModal connectionModalOpen={connectionModalOpen} />
    </Container>
  )
}

export default App
