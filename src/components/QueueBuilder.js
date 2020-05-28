import React, { useState } from 'react'
import { Button, Header, Icon, Popup, Segment } from 'semantic-ui-react'
import '../App.css'

const QueueBuilder = ({ handleQueueClick, queueBuilderDisabled, setQueueBuilderDisabledLocally, maxLedsPerQueue, maxTimePerLed, minTimePerLed }) => {
  const [ledIds, setLedIds] = useState(['led-not-set', ...Array(maxLedsPerQueue - 1).fill('led-inactive')])
  const [ledIcons, setLedIcons] = useState(['circle', ...Array(maxLedsPerQueue - 1).fill('circle outline') ])
  const [ledColors, setLedColors] = useState(Array(maxLedsPerQueue).fill('black'))
  const [ledTimes, setLedTimes] = useState(Array(maxLedsPerQueue).fill(0.5))

  if (maxLedsPerQueue > ledIds.length) {
    setLedIds(['led-not-set', ...Array(maxLedsPerQueue - 1).fill('led-inactive')])
    setLedIcons(['circle', ...Array(maxLedsPerQueue - 1).fill('circle outline') ])
    setLedColors(Array(maxLedsPerQueue).fill('black'))
    setLedTimes(Array(maxLedsPerQueue).fill(0.5))
  }

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
      setQueueBuilderDisabledLocally(false)
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

  const handleDurationChange = (e, index) => {
    ledTimes[index] = e.target.value
    setLedTimes([ ...ledTimes ])
  }

  const handleSendQueue = (ledColors, ledTimes) => {
    handleQueueClick(ledColors, ledTimes)

    setLedIds(['led-not-set', ...Array(maxLedsPerQueue - 1).fill('led-inactive')])
    setLedIcons(['circle', ...Array(maxLedsPerQueue - 1).fill('circle outline') ])
    setLedColors(Array(maxLedsPerQueue).fill('black'))
    setLedTimes(Array(maxLedsPerQueue).fill(0.5))
    setQueueBuilderDisabledLocally(true)
  }

  return(
    <Segment>
      <Header as="h3" textAlign="center">Sequence Builder</Header>
      <div>You can construct LED sequences here. Click the LED icons to set their
        colors, then set on-time durations below (default is 0.5s per LED).
      </div><br />
      <div>Maximum amount of LEDs: {maxLedsPerQueue}, on-time duration
        interval: {minTimePerLed}s - {maxTimePerLed}s
      </div>
      <Segment>
        <Popup position='bottom left' content='Click on the LED symbols to change the color, then set their on-time duration below' trigger={<Icon id={ledIds[0]} color={ledColors[0]} onClick={ledIds[0] !== 'led-inactive' ? () => handleLedClick(0) : () => void(0)} size='big' name={ledIcons[0]} />} />
        {ledIds.map( (id, i) =>
          <Icon
            key={`led-icon-${i}`}
            id={ledIds[i + 1]}
            color={ledColors[i + 1]}
            onClick={ledIds[i + 1] !== 'led-inactive' ? () => handleLedClick(i + 1) : () => void(0)}
            size='big'
            name={ledIcons[i + 1]}
          />
        )}

      </Segment>
      <Segment>
        {ledColors.map( (color, i) =>
          <input
            key={`led-duration-${i}`}
            onChange={(event) => handleDurationChange(event, i)}
            disabled={ledColors[i] === 'black' ? true : false}
            name={`led${i}`}
            type='number'
            min={minTimePerLed}
            max={maxTimePerLed}
            placeholder='0.5'
            size='2'
            step='0.1'
            style={{ width: '3em' }}
          />
        )}
      </Segment>
      <Button
        color='brown'
        disabled={queueBuilderDisabled.fromServer || queueBuilderDisabled.locally}
        onClick={() => handleSendQueue(ledColors, ledTimes)}>
          Send Sequence to Server
      </Button>
    </Segment>
  )
}

export default QueueBuilder