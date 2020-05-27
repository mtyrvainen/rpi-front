import React from 'react'
import { Header, List, Segment } from 'semantic-ui-react'

const QueueList = ({ queue, runningItem, maxQueueLength, queueTimer }) => {
  if (runningItem.length > 0) {
    runningItem = runningItem[0]
  }
  return(
    <Segment>
      <Header as='h3' textAlign='center'>LED Sequences</Header>
      <Segment inverted >
        <List inverted relaxed>
          <List.Item color='green'>
            <List.Icon name='lightbulb' color={runningItem.length !== 0 ? 'yellow' : 'grey'} size='large' id={runningItem.length !== 0 ? 'pulsing-icon' : ''} verticalAlign='middle' />
            <List.Content>
              <List.Header>{runningItem.length !== 0 ? runningItem.colors.toString() : 'Next execution in appx.' }</List.Header>
              <List.Description>{runningItem.length !== 0 ? `by ${runningItem.user}` : `${queueTimer} s`}</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
      <Header as="h4" textAlign="center">Sequence Queue: {queue.length}/{maxQueueLength}</Header>
      <List divided relaxed>
        {queue.map((item, i) => <List.Item key={i}><List.Icon name='lightbulb' size='large' verticalAlign='middle' />
          <List.Content><List.Header>{item.colors.toString().toUpperCase()}</List.Header> <List.Description>by {item.user}</List.Description></List.Content></List.Item>)}
      </List>
    </Segment>
  )
}

export default QueueList




