//long non-hook way of producing app

import React from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001"); //loads right away here

//when the form is submitted, send a message to our websocket server
//when we recieve a chat message event from teh server, show the message

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      input: "",
      messages: []
    };
  }

  //this.socket = io("localhost:8080"); means when will render when object is constructed

  sendMessage = e => {
    e.preventDefault();
    socket.emit("SEND_MESSAGE", { message: this.state.input });
    this.setState(() => ({ input: "" }));
  };

  componentDidMount = () => {
    socket.on("RECEIVE_MESSAGE", msg => {
      this.setState(
        state => ({
          messages: [...state.messages, msg]
        }),
        () => {
          window.scrollTo(0, document.body.scrollHeight);
        }
      );
    });
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState(() => ({
      input: value
    }));
  };

  render() {
    return (
      <div>
        {this.state.messages.map(message => (
          <div>{message.message}</div>
        ))}
        <form onSubmit={this.sendMessage}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.input}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default Chat;
