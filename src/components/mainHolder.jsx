import React, { PureComponent } from 'react';
import ServerSelectionBar from './serverSelection';
import ChannelSelection from './channelSelection';
import ChatWindow from './ChatWindow/chatWindow';
import FriendsWindow from './FriendSelection/friendsWindow';
import MenuHolder from './Menus/menuHolder';

import './components.css';

class MainHolder extends React.Component {
    state = {
        currentWindowHeight: 0,
        currentWindowWidth: 0,
        availableServers: [],
        availableChannels: [],
        currentUserID: 0,
        currentServerID: 0,
        currentChannelID: 0,
        isMenuShown: true,
        menuType: 5
    }

    componentDidMount() {
        //Dynamic resizing event mount.
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        //Loading available servers and channels on first start.
        this.getAvailableServers();
        this.getAvailableChannels();

        //Setting default channel and server on first start.
        this.setChannelServerDefaults();
    }

    componentDidUpdate(prevProps, prevState) {
        //Update servers and channels after every server/channel load.
        if (this.state.selectedServerID !== prevState.selectedServerID) {
            this.getAvailableServers();
            this.getAvailableChannels();
        }
        if (this.state.selectedChannelID !== prevState.selectedChannelID) {
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
                    channels={this.state.availableChannels}
                    onChannelClick={this.handleChannelSelected}
                    sizeX={this.state.currentWindowWidth}
                    sizeY={this.state.currentWindowHeight}
                />
                {/*Middle chat window.*/}
                <ChatWindow
                    currentChatName={"Chat Window Name - DEBUG"}
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

    getAvailableServers = (userID) => {
        //Loading all servers available to this user.
        const current = [];
        for (let i = 0; i < 5; i++) {
            current.push({key: i, id: i, name: ('Server ' + i), pictureUrl: 'https://picsum.photos/200'});
        }
        this.setState({availableServers: current});
    }

    getAvailableChannels = (serverID) => {
        const current = [];
        for (let i = 0; i < 20; i++) {
            current.push({key: i, id: i, channelName: ('Channel ' + i)});          
        }
        this.setState({availableChannels: current});
    }

    handleServerSelected = (selectedServerID) => {
        //Server was changed. Load channels from this server.
        console.log('Clicked', selectedServerID);
        this.setState({currentServerID: selectedServerID});
        this.setChannelDefaults();
    }

    handleChannelSelected = (selectedChannelID) => {
        //Channel was changed. Load comments from this channel.
        console.log('Clicked', selectedChannelID);
        this.setState({currentChannelID: selectedChannelID});
    }

    handleMessageSent = (messageText) => {
        console.log('Msg handled:', messageText);
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
        console.log("Handled create channel:\n", name, acccessLevel);
        this.setState({isMenuShown: false});
    }

    handleEditChannel = (newName, newAccessLevel) => {
        //Controlled by the EditChannelMenu
        console.log("Handled create channel:\n", newName, newAccessLevel);
        this.setState({isMenuShown: false});
    }

    handleDeleteChannel = () => {
        //TODO
    }

    handleCreateServer = () => {

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