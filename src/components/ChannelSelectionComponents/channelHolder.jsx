import React, { Component } from 'react';
import Channel from './channel';

import '../components.css';

class ChannelHolder extends React.Component {
    state = {
        
    }

    render() { 
        const channels = this.props.channels ? this.props.channels : []
        console.log(channels);

        return (
            <div className={'channelHolder'}>
                {channels.map(channel => 
                <Channel
                    key={channel.key}
                    id={channel.id}
                    name={channel.channelName}
                />)}
            </div>
        );
    }
}
 
export default ChannelHolder;