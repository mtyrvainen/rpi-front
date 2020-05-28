import React from 'react'
import { Container, Icon, Message, Popup } from 'semantic-ui-react'

const DeveloperInfo = () => {
  return(
    <Popup
      position='top center'
      content='Visit developer&apos;s homepage: www.markotyrvainen.fi'
      trigger={
        <Message info>
          <Icon id='info-logo'
            onClick={() => window.open('http://www.markotyrvainen.fi')}
            name='user circle outline'
            size='huge'
          />
          <Container style={{ margin: '0.5em' }}>
                    Who made this?
          </Container>
        </Message>}
    />
  )
}

export default DeveloperInfo