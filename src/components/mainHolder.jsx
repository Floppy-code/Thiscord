import React, { PureComponent } from 'react';
import ServerSelectionBar from './serverSelection';
import ChannelSelection from './channelSelection';

import './components.css';

class MainHolder extends React.Component {
    state = {
        availableServers: [],
        availableChannels: [],
        currentServerID: 0
    }

    render() { 
        return (
            <div className={'mainBackground'}>
                <ServerSelectionBar onServerClick={this.handleServerSelected}/>
                <ChannelSelection onChannelClick={this.handleChannelSelected}/>
            </div>
        );
    }

    handleServerSelected = () => {
        //TODO
    }

    handleChannelSelected = () => {
        //TODO
    }
}
 
export default MainHolder;