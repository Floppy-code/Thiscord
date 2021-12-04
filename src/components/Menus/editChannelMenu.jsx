import React, { Component } from 'react';

class EditChannelMenu extends React.Component {
    render() { 
        return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">New channel name</label>
                    <input type="text" className="form-control" id="channelIDInput" placeholder="Enter new channel name"></input>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">New channel access level</label>
                    <input type="text" className="form-control" id="accessLevelInput" placeholder="Enter new channel access level"></input>
                </div>
                <br/>
                <button onClick={() => this.handleSubmit()} type="button" className="btn btn-primary" id='submitBtn'>Create channel</button>
            </form>
        </div>);
    }

    handleSubmit = () => {
        const name = document.getElementById('channelIDInput').value;
        const accessLevel = document.getElementById('accessLevelInput').value;
        this.props.editChannelHandler(name, accessLevel);
    }
}
 
export default EditChannelMenu;