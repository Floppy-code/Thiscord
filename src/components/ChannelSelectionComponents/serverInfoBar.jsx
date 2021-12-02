import React, { Component } from 'react';

import '../components.css';
import 'bootstrap/dist/css/bootstrap.css';

class ServerInfoBar extends React.Component {
    render() { 
        return <div className={'serverInfoBar'}>
            <h6 className={'serverInfoBarText'}>ADD SERVER NAME</h6>
        </div>;
    }
}
 
export default ServerInfoBar;