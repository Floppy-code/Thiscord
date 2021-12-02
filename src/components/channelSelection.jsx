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
                <ServerInfoBar
                serverName = {this.props.currentServerName}
                />
                <ChannelHolder 
                channels = {this.props.channels}
                sizeX = {this.props.sizeX}
                sizeY = {this.props.sizeY}
                onChannelClick = {this.props.onChannelClick}
                />
            </div>
        );
    }

    handleMouseScrool = () => {
        //TODO
    }
}
 
export default ChannelSelection;