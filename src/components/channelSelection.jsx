import React, { Component } from 'react';
import ServerInfoBar from './ChannelSelection/serverInfoBar';
import ChannelHolder from './ChannelSelection/channelHolder';

import './components.css';

class ChannelSelection extends React.Component {
    state = {
        scroolY: 0,
    }

    render() { 
        return (
            <div className={'mainChannelSelection'}>
                {/*Server name holder.*/}
                <ServerInfoBar
                serverName = {this.getServerNameFromID(this.props.serverID)}
                />
                {/*Holder for all available server channels.*/}
                <ChannelHolder 
                channels = {this.props.channels}
                sizeX = {this.props.sizeX}
                sizeY = {this.props.sizeY}
                onChannelClick = {this.props.onChannelClick}
                />
            </div>
        );
    }

    getServerNameFromID = (serverID) => {
        //TODO - Connection to DB
        return "SERVER NAME: " + serverID;
    }
}
 
export default ChannelSelection;