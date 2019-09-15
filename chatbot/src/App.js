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
      answer: []
    }
  }

  async componentDidMount() {
    const resp = await fetch('https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.init', {
      // method: 'POST',
      "uuid": "772c9859-4dd3-4a0d-b87d-d76b9f43cfa4"
    })
    const cuid = await resp.json()
    this.setState({ cuid: cuid.result.cuid })

  }
  onChange(e) {
    this.setState({ text: e.target.value })
  }


  async onClick(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return
    }
    const newItem = {text: this.state.text}
    await this.setState({
      clientMessage: [...this.state.clientMessage,newItem],
      text: ''
    })
    const resp1 = await fetch('https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.request', {
      "cuid": this.state.cuid,
      "text": this.state.clientMessage
    })
    const ans = await resp1.json()
    
    console.log(this.state)
    
    await this.setState({ answer: ans.result.text.value})
    console.log(ans.result.text.value);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.answer === ""
            ? <Answer answer={this.state.answer} clientMessage={this.state.clientMessage} />
            : null
          }
          <input placeholder="text" onChange={this.onChange}></input>
          <button type="submit" onClick={this.onClick}>Send</button>
        </header>
      </div>
    );
  }
}

export default App;
