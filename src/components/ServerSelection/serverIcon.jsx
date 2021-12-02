import React, { Component } from 'react';

import '../components.css';
import 'bootstrap/dist/css/bootstrap.css';

class ServerIcon extends React.Component {
    state = {
        mouseHover: false
    }

    constructor(props) {
        super(props);
        this.reference = React.createRef();
    }

    render() {
        return (
            <div 
            ref = {this.reference}
            className = {'serverSelection'}
            onMouseEnter={() => this.setIsOnIcon(true)}
            onMouseLeave={() => this.setIsOnIcon(false)}
            onClick={() => this.props.onClick(this.props.id)}>
                {this.getInfoBox()}
                <img style={this.getImageStyle()} 
                src={this.props.pictureUrl}/>
            </div>
        );
    }

    getImageStyle = () => {
        let radius;
        let ptr;
        radius = this.state.mouseHover ? 25 : 50;
        ptr = this.state.mouseHover ? 'pointer' : 'default';

        const style = {
            borderRadius: radius + '%',
            width: '60px',
            height: '60px',
            transition: 'all 200ms',
            cursor: ptr
        }
        return style;
    }

    getInfoBox = () => {
        const offsetY = this.reference.current ? this.reference.current.offsetTop + (60 * 0.4) : 0;
        const style = {
            position: 'absolute',
            left: '90px',
            top: this.reference.current ? offsetY + 'px' : '0px',
        }
        if (this.state.mouseHover) {
            return (
                <span className="btn btn-primary btn-sm"
                style = {style}>
                    {this.props.name}
                </span>
            );
        }
        return null;
    }

    setIsOnIcon(input) {
        this.setState({mouseHover: input});
    }
}
 
export default ServerIcon;