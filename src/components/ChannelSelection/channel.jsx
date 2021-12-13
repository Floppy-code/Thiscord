import React, { Component } from 'react';

import '../components.css';

class Channel extends React.Component {
    state = {
        channelStyle: 'channel',
        toRemove: false,
    }

    constructor(props) {
        super(props);
    }

    render() { 
        return (
        <div 
        className={this.state.channelStyle}
        onMouseOver={() => this.setChannelStyle(true)}
        onMouseOut={() => this.setChannelStyle(false)}
        onClick={() => this.props.onClick(this.props.id)}>
            <div style={{'float' : 'inherit'}}>
                <h6 className={'channelText'}>
                    {this.props.name}
                    <div style={{'float' : 'right', 'paddingRight' : '10px'}}>
                        <i class="bi bi-dash-circle"
                            onClick={() => this.props.onChannelRemove(this.props.id)}
                        />
                    </div>
                </h6>
            </div>

        </div>);
    }


    setChannelStyle = (mouseIn) => {
        let style = mouseIn ? 'channelMouseHover' : 'channel';
        this.setState({channelStyle: style});
    }
}
 
export default Channel;