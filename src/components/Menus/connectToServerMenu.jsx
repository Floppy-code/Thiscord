import React, { Component } from 'react';

class ConnectToServerMenu extends React.Component {
    render() { 
        return (
            <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Server name</label>
                <input type="text" className="form-control" id="serverName" aria-describedby="emailHelp" placeholder="Name"></input>
            </div>
            <br/>
            <button onClick={() => this.handleSubmit()} type="button" className="btn btn-primary" id='submitBtn'>Connect</button>
            </form>);
    }

    handleSubmit = () => {
        const name = document.getElementById('serverName').value;
        this.props.connectToServerHandler(name);
    }
}
 
export default ConnectToServerMenu;