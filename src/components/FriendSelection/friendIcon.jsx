import React, { Component } from 'react';
import {postData} from '../DBRequestHandler';

class FriendIcon extends React.Component {
    state = {
        base64img : 'empty'
    }

    componentDidMount() {
        this.getAvatarFromBase64(this.props.friendID);
    }

    render() { 
        return (
            <div className={'friendWindowBar'}>
                {/*Avatar, username and message time.*/}
                <div className={'chatWindowMessageUser'}>
                    <div>
                    <img 
                    id='avatarImage'
                    src={this.state.base64img}
                    style = {{'width' : '40px', 'height' : '40px'}}
                    className={'chatWindowMessageUserImg'}/>
                    </div>
                    <div className={'friendWindowBarUsername'}>
                        <h6>
                            {this.props.friendUsername}
                            <br></br>
                            <div 
                            style={{'float': 'left', 'cursor' : 'pointer'}} 
                            onClick={() => this.handlePrivateMessage()}>
                                <i class="bi bi-chat-right-dots"></i>
                            </div>
                            <div 
                            style={{'float': 'left', 'marginLeft':'10px', 'cursor' : 'pointer'}}
                            onClick={() => this.handleRemoveFriend()}>
                                <i class="bi bi-trash"></i>
                            </div>
                        </h6>
                    </div>
                </div>
            </div>
        );
    }

    handlePrivateMessage = () => {
        this.props.onChannelClick(this.props.friendID)
    }

    handleRemoveFriend = () => {
        this.props.onRemoveFriend(this.props.friendID);
    }

    getAvatarFromBase64 = (userID) => {
        //TODO: Implement DB
        postData('base64_image', {userID : userID, isServer : false}).then(data => {
            //var image = new Image();
            //image.src = 'data:image/jpg;base64,' + data.base64image;
            let b64string = 'data:image/jpg;base64,' + data.base64image;
            // document.body.appendChild(image);
            // document.getElementById('avatarImage').src = 
            this.setState({base64img : b64string})
        });
    }
}
 
export default FriendIcon;