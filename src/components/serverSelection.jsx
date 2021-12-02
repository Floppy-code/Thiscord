import React, { Component } from 'react';
import ServerIcon from './ServerSelectionComponents/serverIcon';

import './components.css';


//https://picsum.photos/200
class ServerSelectionBar extends React.Component {
    state = {
        userServers: []
    }
    
    componentDidMount() {
        this.getAvailableServers();
    }

    render() { 
        return (
        <div className={'mainServerSelection'}>
            { this.state.userServers.map(server =>
            <ServerIcon
                key={server.key}
                id={server.key}
                name={server.name}
                pictureUrl={server.pictureUrl}>
            </ServerIcon>) }
        </div>
        );
    }

    // renderAvailableServers = () => {
    //     this.state.userServers.map(server => )
    // }

    getAvailableServers = () => {
        const servers = [...this.state.userServers];
        for (let i = 0; i < 5; i++) {
            servers.push({key: i, name: ('Name' + i), pictureUrl:'https://picsum.photos/200'});
        }

        this.setState({userServers: servers});
    }
}
 
export default ServerSelectionBar;