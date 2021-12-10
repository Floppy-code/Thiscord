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
        currentUserID: 8, //HARDCODED - Change later!
        currentServerID: 0,
        currentChannelID: 0,
        currentServerName: "",
        currentChannelName: "",
        isMenuShown: false,
        menuType: -1,
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
                    sizeX={this.state.currentWindowWidth}
                    sizeY={this.state.currentWindowHeight}
                />
                {/*Middle chat window.*/}
                <ChatWindow
                    currentChatName={this.state.currentChannelName}
                    userID={this.state.currentUserID}
                    serverID={this.state.currentServerID}
                    channelID={this.state.currentChannelID}
                    sizeY={this.state.currentWindowHeight}
                    onMessageSent={this.handleMessageSent}
                    onMessageDelete={this.handleMessageDelete}
                />
                {/*Friends window*/}
                <FriendsWindow/>
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
                menuType={this.state.menuType}
                sendImageHandler={this.handleSendImage}
                createChannelHandler={this.handleCreateChannel}
                editChannelHandler={this.handleEditChannel}
                createServerHandler={this.handleCreateServer}
                loginHandler={this.handleLogin}
                connectToServerHandler={this.handleConnectToServer}
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
        this.setState({currentChannelID: selectedChannelID});
    }

    handleMessageSent = (messageText) => {
        console.log('Msg handled:', messageText);
        postData('channel_send_message', {userID: this.state.currentUserID,
                                        channelID: this.state.currentChannelID,
                                        text: messageText});
    }

    handleShowMenu = (menuType) => {
        this.setState({isMenuShown: true, menuType: 0})
    }

    handleMessageDelete = (messageID) => {
        
    }

    handleSendImage = () => {

    }

    handleCreateChannel = (name, acccessLevel) => {
        //Controlled by the CreateChannelMenu.
        this.setState({isMenuShown: false});
    }

    handleEditChannel = (newName, newAccessLevel) => {
        //Controlled by the EditChannelMenu
        this.setState({isMenuShown: false});
    }

    handleDeleteChannel = () => {
        //TODO
    }

    handleCreateServer = (serverName, serverAvatar) => {
        console.log("handle called");
    }

    handleDeleteServer = () => {

    }

    handleLogin = (username, password) => {
        //Controlled by the EditChannelMenu
        console.log("Handled create channel:\n", username, password);
        this.setState({isMenuShown: false});
    }

    handleConnectToServer = (serverName) => {
        console.log("Handled connect to server:\n", serverName);
        this.setState({isMenuShown: false});
    }
}
 
export default MainHolder;