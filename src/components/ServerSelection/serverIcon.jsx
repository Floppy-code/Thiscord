import React, { Component } from 'react';

import '../components.css';
import 'bootstrap/dist/css/bootstrap.css';
import {postData} from '../DBRequestHandler';

class ServerIcon extends React.Component {
    state = {
        mouseHover: false,
        base64img: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MkRCMEM1OTVCQkIxMUVDODQ5OEVEMEEzNDM3OEY4MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MkRCMEM1QTVCQkIxMUVDODQ5OEVEMEEzNDM3OEY4MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUyREIwQzU3NUJCQjExRUM4NDk4RUQwQTM0Mzc4RjgwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUyREIwQzU4NUJCQjExRUM4NDk4RUQwQTM0Mzc4RjgwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgICAgICAgICAgMCAgID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'
    }

    constructor(props) {
        super(props);
        this.reference = React.createRef();
    }

    componentDidMount() {
        this.getAvatarFromBase64(this.props.id);
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
                src={this.state.base64img}/>
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

    getAvatarFromBase64 = (serverID) => {
        if (serverID < 0) {return;}
        postData('base64_image', {userID : serverID, isServer : true}).then(data => {
            let b64string = 'data:image/jpg;base64,' + data.base64image;
            this.setState({base64img : b64string})
        });
    }

    setIsOnIcon(input) {
        this.setState({mouseHover: input});
    }
}
 
export default ServerIcon;