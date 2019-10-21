// import stomp from 'stompjs'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
const isDev = process.env.REACT_APP_ENV !== 'production'

export default (routeKey, onConnectCb, onErr) => {
  const server = isDev
    ? 'http://10.4.151.52:15674/stomp'
    : 'https://websaupg.mosoblgaz.ru/stomp'

  const queueName = isDev ? 'websaupg.dev' : 'websaupg.prod'
  const socketFactory = () => {
    return new SockJS(server)
  }

  const stompConfig = {
    connectHeaders: {
      login: 'guest',
      passcode: 'guest',
      host: queueName
    },
    webSocketFactory: socketFactory,
    debug: (str) => {
      isDev && console.log('STOMP: ' + str)
    },
    reconnectDelay: 2000,
    heartbeatIncoming: 5000,
    heartbeatOutgoing: 5000,
    onConnect: frame => {
      // The return object has a method called `unsubscribe`
      this.stompClient.subscribe(`/exchange/telecontact_calls/${routeKey}`, m => onConnectCb(m))
      isDev && console.log('connected')
    },
    onStompError: err => {
      isDev && console.log(err, 'err')
    }
  }

  this.stompClient = new Client(stompConfig)
  this.stompClient.activate()
}
