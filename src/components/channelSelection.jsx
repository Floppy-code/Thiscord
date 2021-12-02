import React, { Component } from 'react';
import ServerInfoBar from './ChannelSelectionComponents/serverInfoBar';
import ChannelHolder from './ChannelSelectionComponents/channelHolder';

import './components.css';
import Channel from './ChannelSelectionComponents/channel';

class ChannelSelection extends React.Component {
    state = {
        scroolY: 0,
        channels: []
    }

    componentDidMount = () => {
        this.getAvailableChannels();
    }

    render() { 
        return (
            <div className={'mainChannelSelection'}>
                <ServerInfoBar
                serverName = {}
                />
                <ChannelHolder 
                channels = {this.state.channels}
                />
            </div>
        );
    }

    getAvailableChannels = () => {
        const availableChannels = [];

        //20 Fake channels
        for (let i = 0; i < 20; i++) {
            availableChannels.push({key: i, id: i, channelName: ('Channel ' + i)});
        }
        this.setState({channels: availableChannels});
    }

    handleMouseScrool = () => {
        //TODO
    }
}
 
export default ChannelSelection;