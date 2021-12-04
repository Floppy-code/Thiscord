import React, { Component } from 'react';

import CreateChannelMenu from './createChannelMenu';
import EditChannelMenu from './editChannelMenu';
import CreateServerMenu from './createServerMenu';
import LoginMenu from './loginMenu';
import ConnectToServerMenu from './connectToServerMenu';


class MenuHolder extends React.Component {
    //Menu types
    //0 - Send image menu           3 - Create server menu
    //1 - Create channel menu       4 - Login menu    
    //2 - Edit channel menu         5 - Connect to server menu

    render() { 
        return (
            <div className = {'mainMenuBackground'}>
                <div className = {'mainMenuHolder'}>
                    {this.getMenuElements()}
                </div>
            </div>
        );
    }

    getMenuElements = () => {
        switch(this.props.menuType) {
            case 0:
                {/*TODO*/}
                return <div></div>;
            case 1:
                return <CreateChannelMenu createChannelHandler={this.props.createChannelHandler}/>
            case 2:
                return <EditChannelMenu editChannelHandler={this.props.editChannelHandler}/>
            case 3:
                return <CreateServerMenu createServerHander={this.props.createServerHander}/>
            case 4:
                return <LoginMenu loginHandler={this.props.loginHandler}/>
            case 5:
                return <ConnectToServerMenu connectToServerHandler={this.props.connectToServerHandler}/>
            default:
                return <div></div>;
        }
    }
}
 
export default MenuHolder;