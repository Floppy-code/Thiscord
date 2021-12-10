import React, { Component } from 'react';

class ChatMessage extends React.Component {
    render() { 
        return (
            <div className={'chatWindowMessage'}>
                {/*Avatar, username and message time.*/}
                <div className={'chatWindowMessageUser'}>
                    <img 
                    src={this.getAvatarFromBase64(this.props.messageID)}
                    className={'chatWindowMessageUserImg'}/>
                    <div className={'chatWindowMessageUserUsername'}>
                        <h5>
                            {this.props.username}
                            <h6 className="text-muted">{this.props.date}</h6>
                        </h5>
                    </div>
                </div>

                {/*Message content: text or picture.*/}
                <div className={'chatWindowMessageText'}>
                    {this.props.text}
                </div>
            </div>
        );
    }

    getAvatarFromBase64 = (messageID) => {
        //TODO: Implement DB
        return 'https://picsum.photos/45';
    }
}
 
export default ChatMessage;