import React from 'react';
import Answer from "./Answer";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      cuid: '',
      text: '',
      clientMessage: [],
      answer: [],
      chat: [{}]
    }
  }

  async componentDidMount() {
    const resp = await fetch('http://localhost:3001/chatbot')
    const cuid = await resp.json()
    // console.log(cuid)
    this.setState({ cuid: cuid.cuid })

  }
  onChange(e) {
    this.setState({ text: e.target.value })
  }

  onClick = async e => {
    e.preventDefault();
    if (!this.state.text.length) {
      return
    }
    const newItem = { text: this.state.text }
    await this.setState({
      clientMessage: [...this.state.clientMessage, newItem],
      text: ''
    });
    const send = {cuid: this.state.cuid, text: newItem.text}
    const resp1 = await fetch('http://localhost:3001/request', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(send)
    })
    console.log(JSON.stringify(send))
    const ans = await resp1.json();
    await this.setState({ answer: [...this.state.answer, ans.result.text.value] });
    newItem.bot = ans.result.text.value;
    newItem.id = ans.result.id;
    await this.setState({ chat: [...this.state.chat, newItem] });

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <Answer chat={this.state.chat} answer={this.state.answer} clientMessage={this.state.clientMessage} />
          <input placeholder="text" onChange={this.onChange}></input>
          <button type="submit" onClick={this.onClick}>Send</button>
        </header>
      </div>
    );
  }
}

export default App;
