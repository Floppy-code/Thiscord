import React, { Component } from 'react';

import '../components.css';

class Channel extends React.Component {
    state = {
        channelStyle: 'channel'
    }

    constructor(props) {
        super(props);
    }

    render() { 
        return <div 
            className={this.state.channelStyle}
            onMouseOver={() => this.setChannelStyle(true)}
            onMouseOut={() => this.setChannelStyle(false)}>
                <h6 className={'channelText'}>{this.props.name}</h6>
        </div>;
    }

    setChannelStyle = (mouseIn) => {
        let style = mouseIn ? 'channelMouseHover' : 'channel';
        this.setState({channelStyle: style});
    }
}
 
export default Channel;