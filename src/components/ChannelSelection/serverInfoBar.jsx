import React, { Component } from 'react';

import '../components.css';
import 'bootstrap/dist/css/bootstrap.css';

class ServerInfoBar extends React.Component {
    render() { 
        return (
        <div className={'serverInfoBar'}>
            <h6 className={'serverInfoBarText'}>{this.props.serverName}
            <i class="bi bi-plus-circle" 
            style={{'paddingLeft' : '10px', 'cursor' : 'pointer'}}
            onClick={() => this.handleAddChannel()}
            />
            </h6>
        </div>);
    }

    handleAddChannel = () => {
        this.props.onMenuShow(1);
    }
}
 
export default ServerInfoBar;