import React, { Component } from 'react';
import { ReactDOM } from 'react';
import { postData } from '../DBRequestHandler';
import ChatMessage from './chatMessage';

class ChatWindow extends React.Component {
    state = {
        loadedMessages: []
    }

    componentDidMount() {
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
        const chatMessagesStyle = {
            overflow: 'auto',
            height: this.props.sizeY - 108,
        }

        return (
            <div className={'chatWindow'}>
                {/*Channel name bar.*/}
                <div className={'chatWindowInfoBar'}>
                    <h5><i className="bi bi-chat-right-text"></i> {this.props.currentChatName}</h5>
                </div>
                
                {/*Messages inside current channel.*/}
                <div style = {chatMessagesStyle}>
                    {/*TODO: Fix ugly scrollbars!*/}
                    {this.state.loadedMessages.map(msg =>
                        <ChatMessage
                        messageID={msg.messageID}
                        senderID={msg.senderID}
                        avatar={msg.avatar}
                        username={msg.username}
                        date={msg.date}
                        text={msg.text}
                        />
                    )}  
                </div>

                {/*Chat input window.*/}
                <ChatInput
                onMessageSent={this.props.onMessageSent}
                onMessageSentUpdate={this.updateOnMessageSent}/>
            </div>
        );
    }

    getAvailableMessages = () => {
        postData('messages_for_channelID', { channelID : this.props.channelID }).then(data => {
            const messages = [];
            data.query.map(i => messages.push({id: i[0], senderID: i[1], avatar: 'https://picsum.photos/200', username: i[3], date: i[4], text: i[5]}));
            this.setState({loadedMessages: messages});
        });
    }

    getChatNameFromID = (channelID) => {
        //TODO
        return "CHANNEL " + channelID;
    }

    updateOnMessageSent = () => {
        this.getAvailableMessages();
    }
}
 
export default ChatWindow;

class ChatInput extends React.Component {
    render() { 
        return (
        <div className={'chatWindowInputHolder'}>
            <div className="input-group input-group-sm mb-3" style={{width: '100%', float: 'left'}}>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Chat Input</span>
                </div>
                <input 
                type="text" 
                className="form-control" 
                aria-label="Small" 
                aria-describedby="inputGroup-sizing-sm"
                onKeyDown={e => this.handleEnter(e)}
                id='main-msg-input'
                />
            </div>
        </div>
        );
    }

    //Send message to DB.
    handleEnter = (event) => {
        const input = document.getElementById('main-msg-input');
        
        if (event.key === 'Enter' && input.value !== '') {
            this.props.onMessageSent(input.value);
            input.value='';
        }
        this.props.onMessageSentUpdate();
    }
}