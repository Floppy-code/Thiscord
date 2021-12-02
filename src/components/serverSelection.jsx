import React, { Component } from 'react';
import ServerIcon from './ServerSelection/serverIcon';

import './components.css';


//https://picsum.photos/200
class ServerSelectionBar extends React.Component {
    state = {
        currentlyVisible: [],
        userServers: [],
        scrollY: 0,
        mouseOver: false
    }

    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll);

        this.updateVisibleServers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.servers != prevProps.servers) {
            this.updateVisibleServers();
        }
        if (this.props.sizeY != prevProps.sizeY) {
            this.updateVisibleServers();
        }
        if (prevState.scrollY != this.state.scrollY) {
            this.updateVisibleServers();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.handleScroll);
    }
    
    render() { 
        return (
        <div className={'mainServerSelection'}
        onMouseEnter = {() => this.handleMouseOver(true)}
        onMouseLeave = {() => this.handleMouseOver(false)}>
            { this.state.currentlyVisible.map(server =>
            <ServerIcon
                key={server.key}
                id={server.key}
                name={server.name}
                pictureUrl={server.pictureUrl}
                onClick = {this.props.onServerClick}>
            </ServerIcon>) }
        </div>
        );
    }

    updateVisibleServers = () => {
        const visibleServers = [];
        const serverBtnSize = 80;

        let maxVisibleCount = Math.round(this.props.sizeY / serverBtnSize);
        let maxOffset = Math.min(this.props.servers.length, maxVisibleCount);

        if (this.state.scrollY + maxOffset > this.props.servers.length) {
            let old = this.state.scrollY - 1;
            this.setState({scrollY: old});
            return;
        }

        for (let i = this.state.scrollY; i < this.state.scrollY + maxOffset; i++) {
            visibleServers.push(this.props.servers[i]);
        }

        this.setState({currentlyVisible: visibleServers})
    }

    handleScroll = (event) => {
        if (!this.state.mouseOver) {return;}

        const minChannelIndex = 0;
        const maxChannelIndex = this.props.servers.length;
        let newScrollIndex = this.state.scrollY;

        if (event.deltaY > 0) {
            newScrollIndex++;
            newScrollIndex = Math.min(newScrollIndex, maxChannelIndex);
        } else if (event.deltaY < 0){
            newScrollIndex--;
            newScrollIndex = Math.max(newScrollIndex, minChannelIndex);
        }
        this.setState({scrollY: newScrollIndex});
    }

    handleMouseOver = (input) => {
        this.setState({mouseOver: input})
    }
}
 
export default ServerSelectionBar;