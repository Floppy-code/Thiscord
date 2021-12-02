import React, { PureComponent } from 'react';
import ServerSelectionBar from './serverSelection';
import ChannelSelection from './channelSelection';

import './components.css';

class MainHolder extends React.Component {
    state = {
        currentWindowHeight: 0,
        currentWindowWidth: 0,
        availableServers: [],
        availableChannels: [],
        currentServerID: 0,
        currentChannelID: 0
    }

    componentDidMount() {
        //Dynamic resizing event mount.
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        //Loading available servers and channels on first start.
        this.getAvailableServers();
        this.getAvailableChannels();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    render() { 
        return (
            <div className={'mainBackground'}>
                {/*Leftside server selection bar*/}
                <ServerSelectionBar 
                servers={this.state.availableServers}
                onServerClick={this.handleServerSelected}
                sizeX={this.state.currentWindowWidth}
                sizeY={this.state.currentWindowHeight}
                />
                
                {/*Middle channel selection bar*/}
                <ChannelSelection
                currentServerName={"Name"}
                channels={this.state.availableChannels}
                onChannelClick={this.handleChannelSelected}
                sizeX={this.state.currentWindowWidth}
                sizeY={this.state.currentWindowHeight}
                />
                <div style={{color: 'red'}}>DEBUG: {this.state.currentWindowWidth}x{this.state.currentWindowHeight}</div>
            </div>
        );
    }

    updateWindowDimensions = () => {
        this.setState({currentWindowHeight: window.innerHeight, currentWindowWidth: window.innerWidth});
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
    }

    handleChannelSelected = (selectedChannelID) => {
        //Channel was changed. Load comments from this channel.
        console.log('Clicked', selectedChannelID);
    }
}
 
export default MainHolder;