import React, { Component } from 'react';

class ChatMessage extends React.Component {
    render() { 
        return (
            <div className={'chatWindowMessage'}>
                {/*Avatar, username and message time.*/}
                <div className={'chatWindowMessageUser'}>
                    <img 
                    src={this.getAvatarFromBase64(this.props.avatar)}
                    className={'chatWindowMessageUserImg'}/>
                    <div className={'chatWindowMessageUserUsername'}>
                        <div style={{'float' : 'left'}}>
                            <h5>
                                {this.props.username}
                            <h6 className="text-muted">{this.props.date}</h6>
                            </h5>
                        </div>
                        <div 
                        style={{'float' : 'right', 'cursor' : 'pointer'}}
                        onClick={() => this.handleRemoveMessage()}>
                            <i class="bi bi-trash"></i>
                        </div>
                        <div 
                        style={{'float' : 'right', 'cursor' : 'pointer'}}
                        onClick={() => this.props.onBanUser(this.props.senderID)}>
                            <i class="bi bi-dash-circle"/>
                        </div>
                    </div>
                </div>

                {/*Message content: text or picture.*/}
                <div className={'chatWindowMessageText'}>
                    {this.props.text}
                </div>
            </div>
        );
    }
    
    handleRemoveMessage = () => {
        this.props.onMessageDelete(this.props.messageID);
    }

    getAvatarFromBase64 = (messageID) => {
        //TODO: Implement DB
        return 'https://picsum.photos/45';
    }
}
 
export default ChatMessage;