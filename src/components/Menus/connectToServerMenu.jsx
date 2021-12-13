import React, { Component } from 'react';

class ConnectToServerMenu extends React.Component {
    render() { 
        return (
            <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Server ID</label>
                <input type="text" className="form-control" id="serverID" aria-describedby="emailHelp" placeholder="ID eg.1337"></input>
            </div>
            <br/>
            <button onClick={() => this.handleSubmit()} type="button" className="btn btn-primary" id='submitBtn'>Connect</button>
            </form>);
    }

    handleSubmit = () => {
        const name = document.getElementById('serverID').value;
        this.props.connectToServerHandler(name);
    }
}
 
export default ConnectToServerMenu;