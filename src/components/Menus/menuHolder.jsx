import React, { Component } from 'react';

import CreateChannelMenu from './createChannelMenu';
import EditChannelMenu from './editChannelMenu';
import CreateServerMenu from './createServerMenu';
import LoginMenu from './loginMenu';
import ConnectToServerMenu from './connectToServerMenu';
import AddFriendMenu from './addFriendMenu';
import RegisterMenu from './registerMenu';


class MenuHolder extends React.Component {
    //Menu types
    //0 - Register menu             4 - Login menu    
    //1 - Create channel menu       5 - Connect to server menu
    //2 - Edit channel menu         6 - Add friend
    //3 - Create server menu        7 - Register menu

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
                return <RegisterMenu/>
            case 1:
                return <CreateChannelMenu createChannelHandler={this.props.createChannelHandler}/>;
            case 2:
                return <EditChannelMenu editChannelHandler={this.props.editChannelHandler}/>;
            case 3:
                return <CreateServerMenu userID = {this.props.userID}/>;
            case 4:
                return <LoginMenu 
                        loginHandler={this.props.loginHandler}
                        onMenuShow={this.props.onMenuShow}/>;
            case 5:
                return <ConnectToServerMenu connectToServerHandler={this.props.connectToServerHandler}/>;
            case 6:
                return <AddFriendMenu addFriendHandler={this.props.addFriendHandler}/>;
            case 7:
                return <RegisterMenu userID = {this.props.userID}/>;
            default:
                return <div></div>;
        }
    }
}
 
export default MenuHolder;