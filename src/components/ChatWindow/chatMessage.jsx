import React, { Component } from 'react';

class ChatMessage extends React.Component {
    render() { 
        return (
            <div className={'chatWindowMessage'}>
                {/*Avatar, username and message time.*/}
                <div className={'chatWindowMessageUser'}>
                    <img 
                    src={this.getAvatarFromMessageID(this.props.messageID)}
                    className={'chatWindowMessageUserImg'}/>
                    <div className={'chatWindowMessageUserUsername'}>
                        <h5>
                            {this.getNameFromMessageID(this.props.messageID)}
                            <h6 class="text-muted">{this.getDateFromMessageID(this.props.messageID)}</h6>
                        </h5>
                    </div>
                </div>

                {/*Message content: text or picture.*/}
                <div className={'chatWindowMessageText'}>
                    {this.getContentFromMessageID(this.props.messageID)}
                </div>
            </div>
        );
    }

    getNameFromMessageID = (messageID) => {
        //TODO: Implement DB
        return "UserName" + messageID;
    }

    getAvatarFromMessageID = (messageID) => {
        //TODO: Implement DB
        return 'https://picsum.photos/45';
    }

    getDateFromMessageID = (messageID) => {
        return '15.04.2020 13:37';
    }

    getContentFromMessageID = (messageID) => {
        //TODO: Implement DB
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    }
}
 
export default ChatMessage;