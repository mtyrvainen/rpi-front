import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
//const JSMpeg = require('@cycjimmy/jsmpeg-player')

const socket = new WebSocket('ws://tyrvainen.hopto.org:3001/client-socket')
//var streamSocket = new WebSocket('ws://tyrvainen.hopto.org:8082')


ReactDOM.render(
  <React.StrictMode>
    <App websocket={socket} />
  </React.StrictMode>,
  document.getElementById('root')
)