import React from 'react';

class Answer extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         cuid: "",
    //   text: null,
    //   clientMessage: null,
    //   answer: null
    //     }
    // }
  
      render() {

          return (
              <div>
              {this.props.answer}
              <span>{this.props.clientMessage.map(mes => (
                  <div>{mes.text}</div>
          ))}</span>
              
              </div>    
          )
      }
}

export default Answer