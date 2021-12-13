import React, { Component } from 'react';
import FriendIcon from './friendIcon';
import { postData } from '../DBRequestHandler';

import '../components.css';

class FriendsWindow extends React.Component {
    state = {
        friends: []
    }

    componentDidMount() {
        this.getAvailableFriends();
    }

    render() { 
        const chatMessagesStyle = {
            overflow: 'auto',
            height: this.props.sizeY - 108,
        }

        return (
        <div className={'friendsWindowHolder'}>
            {/*Channel name bar.*/}
            <div className={'chatWindowInfoBar'}>
                <div style={{'float' : 'left'}}>
                    <h5> Friends List 
                    <div style={{'float' : 'right', 'paddingRight' : '10px'}}>
                        <i class="bi bi-plus-circle" 
                        style={{'paddingLeft' : '10px', 'cursor' : 'pointer'}}
                        onClick={() => this.props.onAddFriend(6)}
                        />
                    </div>
                    </h5>
                </div>

            </div>
            
            {/*Messages inside current channel.*/}
            <div style = {chatMessagesStyle}>
                {this.state.friends.map(msg =>
                    <FriendIcon
                    friendID = {msg.ID}
                    friendUsername = {msg.username}
                    friendAvatar = {msg.avatar}
                    onRemoveFriend = {this.onRemoveFriend}
                    onChannelClick = {this.props.onChannelClick}
                    />
                )}  
            </div>
        </div>);
    }

    onRemoveFriend= (userID) => {
        this.props.onRemoveFriend(userID);
        this.getAvailableFriends();
    }

    getAvailableFriends = () => {
        postData('friends_from_id', {userID : this.props.userID}).then(data => {
            const current = [];
            //data.query.map(i => current.push({ID : i[0], username : i[1], avatar : i[2]}));
            data.query.map(i => current.push({ID : i[0], username : i[1]}));
            this.setState({friends : current})
        })
    }
}
 
export default FriendsWindow;