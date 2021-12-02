import React, { Component } from 'react';
import Channel from './channel';

import '../components.css';

class ChannelHolder extends React.Component {
    state = {
        currentlyVisible: [],
        scrollStepY: 0,
        mouseOver: false
    }

    componentDidMount() {
        this.getVisibleChannels();
        window.addEventListener('wheel', this.handleScrool);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.channels !== prevProps.channels) {
            this.getVisibleChannels();
        }
        if (this.props.sizeY != prevProps.sizeY) {
            this.getVisibleChannels();
        }
        if (this.state.scrollStepY != prevState.scrollStepY) {
            this.getVisibleChannels();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.handleScrool);
    }

    render() { 
        //const channels = this.props.channels ? this.props.channels : []
        //console.log(channels);
        return (
            <div className={'channelHolder'}
            onMouseEnter = {() => this.handleMouseOver(true)}
            onMouseLeave = {() => this.handleMouseOver(false)}>
                {this.state.currentlyVisible.map(channel => 
                <Channel
                    key={channel.key}
                    id={channel.id}
                    name={channel.channelName}
                    onClick={this.props.onChannelClick}
                />)}
            </div>
        );
    }

    getVisibleChannels = () => {
        const visibleChannels = [];
        const channelBtnSize = 35;
        let maxVisibleCount = Math.round((this.props.sizeY / channelBtnSize) - 3);
        let maxOffset = Math.min(maxVisibleCount, this.props.channels.length);

        if (this.state.scrollStepY + maxOffset > this.props.channels.length) {
            let old = this.state.scrollStepY - 1;
            this.setState({scrollStepY: old});
            return;
        }

        for (let i = this.state.scrollStepY; i < this.state.scrollStepY + maxOffset; i++) {
            visibleChannels.push(this.props.channels[i]);
        }
        this.setState({currentlyVisible: visibleChannels});
    }

    handleMouseOver = (state) => {
        this.setState({mouseOver : state});
    }

    handleScrool = (event) => {
        if (!this.state.mouseOver) {return;}

        const minChannelIndex = 0;
        const maxChannelIndex = this.props.channels.length;
        let newScrollIndex = this.state.scrollStepY;

        if (event.deltaY > 0) {
            newScrollIndex++;
            newScrollIndex = Math.min(newScrollIndex, maxChannelIndex);
        } else if (event.deltaY < 0){
            newScrollIndex--;
            newScrollIndex = Math.max(newScrollIndex, minChannelIndex);
        }
        this.setState({scrollStepY: newScrollIndex});
    }
}
 
export default ChannelHolder;