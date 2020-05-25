import React, { useState } from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import '../App.css'

const QueueBuilder = ({ queueClick, queueBuilderDisabled, maxLedsPerQueue, maxTimePerLed, minTimePerLed }) => {

  const [ledIds, setLedIds] = useState(['led-not-set', 'led-inactive', 'led-inactive', 'led-inactive', 'led-inactive', 'led-inactive', 'led-inactive', 'led-inactive', 'led-inactive', 'led-inactive', 'led-inactive'])
  const [ledIcons, setLedIcons] = useState(['circle', 'circle outline', 'circle outline', 'circle outline', 'circle outline', 'circle outline', 'circle outline', 'circle outline', 'circle outline', 'circle outline'])
  const [ledColors, setLedColors] = useState(['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'])
  const [ledTimes, setLedTimes] = useState([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5])

  const handleLedClick = (index) => {
    if (ledIds[index] === 'led-not-set') {
      ledIds[index] = 'led-set'
      ledIcons[index] = 'circle'
      ledColors[index] = 'red'

      if (index < maxLedsPerQueue - 1) {
        if (ledIds[index + 1] === 'led-inactive') {
          ledIds[index + 1] = 'led-not-set'
          ledIcons[index + 1] = 'circle'
          ledColors[index + 1] = 'black'
        }
      }

      setLedIds([ ...ledIds ])
      setLedIcons([ ...ledIcons ])
      setLedColors([ ...ledColors ])
    } else if (ledIds[index] === 'led-set') {
      if (ledColors[index] === 'red') {
        ledColors[index] = 'green'
        setLedColors([ ...ledColors ])
      } else if (ledColors[index] === 'green') {
        ledColors[index] = 'blue'
        setLedColors([ ...ledColors ])
      } else {
        ledColors[index] = 'red'
        setLedColors([ ...ledColors ])
      }
    }
  }

  const handleTimeChange = (e, index) => {
    console.log('changed value @ index', index, 'value:', e.target.value)
    ledTimes[index] = e.target.value
    setLedTimes([ ...ledTimes ])
  }

  return(
    <Segment>
      <Header as="h4" textAlign="center">Sequence Builder</Header>
      <div>Build a queue item here</div>
      <div>Max Leds: {maxLedsPerQueue}, time per LED {minTimePerLed/1000}s - {maxTimePerLed/1000}s </div>
      <Button disabled={queueBuilderDisabled} onClick={() => queueClick(ledColors, ledTimes)}>Create and send a new Queue Item</Button>
      <Segment>
        <Icon id={ledIds[0]} color={ledColors[0]} onClick={ledIds[0] !== 'led-inactive' ? () => handleLedClick(0) : () => void(0)} size='big' name={ledIcons[0]} />
        <Icon id={ledIds[1]} color={ledColors[1]} onClick={ledIds[1] !== 'led-inactive' ? () => handleLedClick(1) : () => void(0)} size='big' name={ledIcons[1]} />
        <Icon id={ledIds[2]} color={ledColors[2]} onClick={ledIds[2] !== 'led-inactive' ? () => handleLedClick(2) : () => void(0)} size='big' name={ledIcons[2]} />
        <Icon id={ledIds[3]} color={ledColors[3]} onClick={ledIds[3] !== 'led-inactive' ? () => handleLedClick(3) : () => void(0)} size='big' name={ledIcons[3]} />
        <Icon id={ledIds[4]} color={ledColors[4]} onClick={ledIds[4] !== 'led-inactive' ? () => handleLedClick(4) : () => void(0)} size='big' name={ledIcons[4]} />
        <Icon id={ledIds[5]} color={ledColors[5]} onClick={ledIds[5] !== 'led-inactive' ? () => handleLedClick(5) : () => void(0)} size='big' name={ledIcons[5]} />
        <Icon id={ledIds[6]} color={ledColors[6]} onClick={ledIds[6] !== 'led-inactive' ? () => handleLedClick(6) : () => void(0)} size='big' name={ledIcons[6]} />
        <Icon id={ledIds[7]} color={ledColors[7]} onClick={ledIds[7] !== 'led-inactive' ? () => handleLedClick(7) : () => void(0)} size='big' name={ledIcons[7]} />
        <Icon id={ledIds[8]} color={ledColors[8]} onClick={ledIds[8] !== 'led-inactive' ? () => handleLedClick(8) : () => void(0)} size='big' name={ledIcons[8]} />
        <Icon id={ledIds[9]} color={ledColors[9]} onClick={ledIds[9] !== 'led-inactive' ? () => handleLedClick(9) : () => void(0)} size='big' name={ledIcons[9]} />
      </Segment>
      <Segment>
        <input onChange={(e) => handleTimeChange(e, 0)} disabled={ledColors[0] === 'black' ? true : false} name='led0' type='number' min='0.1' max='5' placeholder='0.5' size='2' step='0.1' style={{ width: '3em' }} />
        <input onChange={(e) => handleTimeChange(e, 1)} disabled={ledColors[1] === 'black' ? true : false} name='led1' type='number' min='0.1' max='5' placeholder='0.5' size='2' step='0.1' style={{ width: '3em' }} />
        <input onChange={(e) => handleTimeChange(e, 2)} disabled={ledColors[2] === 'black' ? true : false} name='led2' type='number' min='0.1' max='5' placeholder='0.5' size='2' step='0.1' style={{ width: '3em' }} />
        <input onChange={(e) => handleTimeChange(e, 3)} disabled={ledColors[3] === 'black' ? true : false} name='led3' type='number' min='0.1' max='5' placeholder='0.5' size='2' step='0.1' style={{ width: '3em' }} />
        <input onChange={(e) => handleTimeChange(e, 4)} disabled={ledColors[4] === 'black' ? true : false} name='led4' type='number' min='0.1' max='5' placeholder='0.5' size='2' step='0.1' style={{ width: '3em' }} />
        <input onChange={(e) => handleTimeChange(e, 5)} disabled={ledColors[5] === 'black' ? true : false} name='led5' type='number' min='0.1' max='5' placeholder='0.5' size='2' step='0.1' style={{ width: '3em' }} />
        <input onChange={(e) => handleTimeChange(e, 6)} disabled={ledColors[6] === 'black' ? true : false} name='led6' type='number' min='0.1' max='5' placeholder='0.5' size='2' step='0.1' style={{ width: '3em' }} />
        <input onChange={(e) => handleTimeChange(e, 7)} disabled={ledColors[7] === 'black' ? true : false} name='led7' type='number' min='0.1' max='5' placeholder='0.5' size='2' step='0.1' style={{ width: '3em' }} />
        <input onChange={(e) => handleTimeChange(e, 8)} disabled={ledColors[8] === 'black' ? true : false} name='led8' type='number' min='0.1' max='5' placeholder='0.5' size='2' step='0.1' style={{ width: '3em' }} />
        <input onChange={(e) => handleTimeChange(e, 9)} disabled={ledColors[9] === 'black' ? true : false} name='led9' type='number' min='0.1' max='5' placeholder='0.5' size='2' step='0.1' style={{ width: '3em' }} />
      </Segment>
    </Segment>
  )
}

export default QueueBuilder