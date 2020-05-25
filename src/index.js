import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'semantic-ui-css/semantic.min.css'

const socket = new WebSocket('ws://localhost:3001/client-socket')

ReactDOM.render(
  <React.StrictMode>
    <App websocket={socket} />
  </React.StrictMode>,
  document.getElementById('root')
)