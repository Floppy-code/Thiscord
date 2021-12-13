import React, { PureComponent } from 'react';
import ServerSelectionBar from './serverSelection';
import ChannelSelection from './channelSelection';
import ChatWindow from './ChatWindow/chatWindow';
import FriendsWindow from './FriendSelection/friendsWindow';
import MenuHolder from './Menus/menuHolder';
import {postData} from './DBRequestHandler.js';

import './components.css';

class MainHolder extends React.Component {
    state = {
        currentWindowHeight: 0,
        currentWindowWidth: 0,
        availableServers: [],
        availableChannels: [],
        currentUserID: -1, //HARDCODED - Change later!
        currentServerID: 0,
        currentChannelID: 0,
        isChannelPrivate: false,
        currentServerName: "",
        currentChannelName: "",
        isMenuShown: true,
        menuType: 4,
    }

    async componentDidMount() {
        //TESTING
        //handlePOST('post_test', {'DataVal': 1}).then(res => {this.setState({dbResponse: res})});

        //Dynamic resizing event mount.
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        //Loading available servers and channels on first start.
        this.getAvailableServers(this.state.currentUserID);
        this.getAvailableChannels();

        //Setting default channel and server on first start.
        this.setChannelServerDefaults();

        // postData('test_avatar_base64', {userID : this.state.currentUserID}).then(data => {
        //     console.log(data);
        // });
    }

    componentDidUpdate(prevProps, prevState) {
        //Update servers and channels after every server/channel load.
        if (this.state.currentServerID !== prevState.currentServerID) {
            this.getAvailableServers();
            this.getAvailableChannels();
            this.updateCurrentServerName();
        }
        if (this.state.currentChannelID !== prevState.currentChannelID) {
            this.getAvailableServers();
            this.getAvailableChannels();
            this.updateCurrentChannelName();
        }
        if (this.state.currentUserID !== prevState.currentUserID) {
            this.getAvailableServers();
            this.getAvailableChannels();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    render() { 
        {/*Show menu if its supposed to be shown and ignore the rest.*/}
        if (this.state.isMenuShown) {
            return this.getMenu();
        }

        return (
            <div className={'mainBackground'}>
                {/*Leftside server selection bar*/}
                <ServerSelectionBar 
                    servers={this.state.availableServers}
                    onServerClick={this.handleServerSelected}
                    onMenuShow={this.handleShowMenu}
                    sizeX={this.state.currentWindowWidth}
                    sizeY={this.state.currentWindowHeight}
                />
                
                {/*Middle channel selection bar*/}
                <ChannelSelection
                    serverID={this.state.currentServerID}
                    serverName={this.state.currentServerName}
                    channels={this.state.availableChannels}
                    onChannelClick={this.handleChannelSelected}
                    onChannelRemove={this.handleDeleteChannel}
                    onMenuShow={this.handleShowMenu}
                    sizeX={this.state.currentWindowWidth}
                    sizeY={this.state.currentWindowHeight}
                />
                {/*Middle chat window.*/}
                <ChatWindow
                    currentChatName={this.state.currentChannelName}
                    userID={this.state.currentUserID}
                    serverID={this.state.currentServerID}
                    channelID={this.state.currentChannelID}
                    isChannelPrivate={this.state.isChannelPrivate}
                    sizeY={this.state.currentWindowHeight}
                    onMessageSent={this.handleMessageSent}
                    onMessageDelete={this.handleMessageDelete}
                    onMenuShow={this.handleShowMenu}
                    onBanUser={this.handleBanUser}
                />
                {/*Friends window*/}
                <FriendsWindow
                    userID={this.state.currentUserID}
                    sizeY={this.state.currentWindowHeight}
                    onAddFriend={this.handleShowMenu}
                    onRemoveFriend={this.handleRemoveFriend}
                    onChannelClick={this.handlePrivateChannelSelected}
                />
                {/*DEBUG - Size message*/}
                {/*<div style={{color: 'red'}}>DEBUG: {this.state.currentWindowWidth}x{this.state.currentWindowHeight}</div>*/}
            </div>
        );
    }

    updateWindowDimensions = () => {
        this.setState({currentWindowHeight: window.innerHeight, currentWindowWidth: window.innerWidth});
    }

    getMenu = () => {
        if (this.state.isMenuShown) {
            return (
                <MenuHolder
                userID={this.state.currentUserID}
                menuType={this.state.menuType}
                sendImageHandler={this.handleSendImage}
                createChannelHandler={this.handleCreateChannel}
                editChannelHandler={this.handleEditChannel}
                createServerHandler={this.handleCreateServer}
                loginHandler={this.handleLogin}
                connectToServerHandler={this.handleConnectToServer}
                addFriendHandler={this.handleAddFriend}
                onMenuShow={this.handleShowMenu}
                />
            );
        }
    }

    setChannelServerDefaults = () => {
        //TODO
        //Set default server and channel after page load.
    }

    setChannelDefaults = () => {
        //TODO
        //Set default channel after server load.
    }

    updateCurrentServerName = () => {
        postData('server_name_from_ID', { serverID: this.state.currentServerID }).then(data => {
            this.setState({currentServerName: data.query[0]});
        });
    }

    updateCurrentChannelName = () => {
        if (this.state.isChannelPrivate) {
            this.setState({currentChannelName : 'Private chat'});
            return;
        }
        postData('channel_name_from_ID', { channelID: this.state.currentChannelID }).then(data => {
            this.setState({currentChannelName: data.query[0]});
        });
    }

    getAvailableServers = () => {
        //Loading all servers available to this user.
        //{ id, name, pictureUrl }
        postData('servers_for_userID', { userID: this.state.currentUserID }).then(data => {
            const available = [];
            data.query.map(i => available.push({id: i[0], name:i[1], pictureUrl: 'https://picsum.photos/200'}));
            this.setState({availableServers: available});
        });
    }

    getAvailableChannels = () => {
        //Loading all channels available to this user.
        //{ key, id, channelName }
        postData('channels_for_serverID', { userID: this.state.currentUserID, serverID: this.state.currentServerID }).then( data => {
            const available = [];
            data.query.map(i => available.push({id: i[1], channelName: i[2]}));
            this.setState({availableChannels: available});
        });

        // const current = [];
        // for (let i = 0; i < 20; i++) {
        //     current.push({key: i, id: i, channelName: ('Channel ' + i)});          
        // }
        // this.setState({availableChannels: current});
    }

    handleServerSelected = (selectedServerID) => {
        //Server was changed. Load channels from this server.
        this.setState({currentServerID: selectedServerID});
    }

    handleChannelSelected = (selectedChannelID) => {
        //Channel was changed. Load comments from this channel.
        this.setState({currentChannelID: selectedChannelID, isChannelPrivate : false});
    }

    handlePrivateChannelSelected = (friendID) => {
        console.log('friends', friendID)
        postData('friends_private_channel_id', {userID : this.state.currentUserID,
                                                friendID : friendID}).then(data =>{
            this.setState({currentChannelID : data.query[0], isChannelPrivate : true})
        });
    }

    handleMessageSent = (messageText) => {
        if (this.state.isChannelPrivate) {
            postData('channel_send_message_private', {userID: this.state.currentUserID,
                channelID: this.state.currentChannelID,
                text: messageText});
        } else {
            postData('channel_send_message', {userID: this.state.currentUserID,
                channelID: this.state.currentChannelID,
                text: messageText});
        }
    }

    handleShowMenu = (menuType) => {
        this.setState({isMenuShown: true, menuType: menuType})
    }

    handleMessageDelete = (messageID) => {
        if (this.state.isChannelPrivate) {
            console.log('Removing private msg.')
            postData('remove_message_channel_private', {messageID : messageID,
                                                        userID : this.state.currentUserID});
        } else {
            postData('remove_message_channel', {messageID : messageID,
                                                userID : this.state.currentUserID});
        }
    }

    handleAddFriend = (friendUsername) => {
        postData('add_friend', {userID : this.state.currentUserID, friendUsername : friendUsername} );
        this.setState({isMenuShown : false});
    }

    handleRemoveFriend = (otherUserID) => {
        postData('remove_friend', { currentUserID : this.state.currentUserID,
                                    friendUserID : otherUserID});
    }

    handleBanUser = (userID) => {
        console.log('BAN:', userID);
        //TODO
    }

    handleCreateChannel = (name) => {
        //Controlled by the CreateChannelMenu.
        postData('add_channel', {channelName : name, serverID : this.state.currentServerID});
        this.setState({isMenuShown: false});
        this.getAvailableChannels();
    }

    handleEditChannel = (newName) => {
        //Controlled by the EditChannelMenu
        postData('edit_channel', { userID : this.state.currentUserID, channelID : this.state.currentChannelID, channelName : newName });
        this.setState({isMenuShown: false});
        this.getAvailableChannels();
    }

    handleDeleteChannel = (channelID) => {
        console.log('Delete channel called', channelID)
        postData('remove_channel_from_server', { userID : this.state.currentUserID, channelID : channelID })
        this.getAvailableChannels();
    }

    handleLogin = (username, password) => {
        //Controlled by the EditChannelMenu
        console.log("Handled create channel:\n", username, password);
        postData('login', {username : username, password : password}).then(data => {
            console.log(data.accept);
            if (data.accept === -1) {
                alert('Wrong username or password!');
            } else {
                this.setState({currentUserID : data.accept, isMenuShown : false});
            }
        });
        this.getAvailableChannels();
        this.getAvailableServers();
    }

    handleConnectToServer = (serverID) => {
        postData('connect_to_server', { userID : this.state.currentUserID, serverID : serverID })
        this.setState({isMenuShown: false});
    }
}
 
export default MainHolder;