import React from 'react';

class Answer extends React.Component {

    render() {
        return (
            <div>
{this.props.greeting}
                {this.props.chat.map(chat => (
                    <div key={chat.id}>
                        <p>{chat.text}</p>
                        <p>{chat.bot}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Answer;