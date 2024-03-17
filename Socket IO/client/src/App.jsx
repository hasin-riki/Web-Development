import { io } from "socket.io-client"
import { useEffect, useState } from "react";

const socket = io.connect('http://localhost:3000');

function App() {

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', { message });
  }

  useEffect(() => {
    socket.on('received_message', (data) => {
      setMessageReceived(data.message);
    })
  }, [socket]);

  return (
    <>
      <div>
        <input placeholder="Message..." onChange={(event) => setMessage(event.target.value)}/>
        <button onClick={sendMessage}>Send Message</button>
        <h1>Message: {messageReceived}</h1>
      </div>
    </>
  )
}

export default App
