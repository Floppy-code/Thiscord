import React, { Component } from 'react';
import ChatMessage from './chatMessage';

class ChatWindow extends React.Component {
    state = {
        loadedMessages: []
    }

    componentDidMount(prevProps, prevState) {
        this.getAvailableMessages();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.channelID !== prevProps.channelID) {
            this.getAvailableMessages();
        }
        if (this.props.serverID !== prevProps.serverID) {
            this.getAvailableMessages();
        }
    }

    render() { 
        console.log('Loaded: ' + this.state.loadedMessages.length);
        return (
            <div className={'chatWindow'}>
                {/*Channel name bar.*/}
                <div className={'chatWindowInfoBar'}>
                    <h5><i className="bi bi-chat-right-text"></i> {this.getChatNameFromID(this.props.channelID)}</h5>
                </div>
                
                {/*Messages inside current channel.*/}
                {/*TODO: Fix ugly scrollbars!*/}
                {this.state.loadedMessages.map(msg =>
                    <ChatMessage
                    key={msg.messageID}
                    messageID={msg.messageID}/>
                )}
            </div>
        );
    }

    getAvailableMessages = () => {
        const current = [];
        for (let i = 0; i < 2; i++) {
            current.push({messageID: i})
        }
        this.setState({loadedMessages: current})
    }

    getChatNameFromID = (channelID) => {
        //TODO
        return "CHANNEL " + channelID;
    }
}
 
export default ChatWindow;

class ChatInput extends React.Component {
    render() { 
        return <div></div>;
    }
}