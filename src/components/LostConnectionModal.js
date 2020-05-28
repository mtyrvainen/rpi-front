import React from 'react'
import { Header, Modal } from 'semantic-ui-react'

const LostConnectionModal = ({ connectionModalOpen }) => {
  return(
    <Modal
      basic
      open={connectionModalOpen}
      size='small'>
      <Header
        icon='power cord'
        content='Server connection lost'
      />
      <Modal.Content>
        <p>Connection to server was lost. Please refresh the window to re-connect.</p>
      </Modal.Content>
    </Modal>
  )
}

export default LostConnectionModal