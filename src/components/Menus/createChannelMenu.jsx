import React, { Component } from 'react';

class CreateChannelMenu extends React.Component {
    render() { 
        return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Channel Name</label>
                    <input type="text" className="form-control" id="channelIDInput" aria-describedby="emailHelp" placeholder="Enter channel name"></input>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Channel Access level</label>
                    <input type="text" className="form-control" id="accessLevelInput" placeholder="Enter channel access level"></input>
                </div>
                <br/>
                <button onClick={() => this.handleSubmit()} type="button" className="btn btn-primary" id='submitBtn'>Create channel</button>
            </form>
        </div>);
    }

    handleSubmit = () => {
        const name = document.getElementById('channelIDInput').value;
        const accessLevel = document.getElementById('accessLevelInput').value;
        this.props.createChannelHandler(name, accessLevel);
    }
}
 
export default CreateChannelMenu;