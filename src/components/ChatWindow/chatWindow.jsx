import React, { Component } from 'react';
import { ReactDOM } from 'react';
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
        console.log('Loaded: ' + this.state.loadedMessages.length);
        const chatMessagesStyle = {
            overflow: 'auto',
            height: this.props.sizeY - 108,
        }

        return (
            <div className={'chatWindow'}>
                {/*Channel name bar.*/}
                <div className={'chatWindowInfoBar'}>
                    <h5><i className="bi bi-chat-right-text"></i> {this.getChatNameFromID(this.props.channelID)}</h5>
                </div>
                
                {/*Messages inside current channel.*/}
                <div style = {chatMessagesStyle}>
                    {/*TODO: Fix ugly scrollbars!*/}
                    {this.state.loadedMessages.map(msg =>
                        <ChatMessage
                        key={msg.messageID}
                        messageID={msg.messageID}/>
                    )}  
                </div>

                {/*Chat input window.*/}
                <ChatInput
                onMessageSent={this.props.onMessageSent}/>
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
        return (
        <div className={'chatWindowInputHolder'}>
            <div class="input-group input-group-sm mb-3" style={{width: '90%', float: 'left'}}>
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
                </div>
                <input 
                type="text" 
                class="form-control" 
                aria-label="Small" 
                aria-describedby="inputGroup-sizing-sm"
                onKeyDown={e => this.handleEnter(e)}
                id='main-msg-input'
                />
            </div>
            <div class="input-group" style={{width: '10%'}}>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile04"></input>
                    <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
                </div>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">Button</button>
                </div>
            </div>
        </div>
        );
    }

    handleEnter = (event) => {
        const input = document.getElementById('main-msg-input');
        
        if (event.key === 'Enter' && input.value !== '') {
            this.props.onMessageSent(input.value);
            input.value='';
        }
    }
}