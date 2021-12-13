import React, { Component } from 'react';

class AddFriendMenu extends React.Component {
    render() { 
        return (
            <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Friend username</label>
                <input type="text" className="form-control" id="friendUsername" aria-describedby="emailHelp" placeholder="Friend Username"></input>
            </div>
            <br/>
            <button onClick={() => this.handleSubmit()} type="button" className="btn btn-primary" id='submitBtn'>Connect</button>
            </form>);
    }

    handleSubmit = () => {
        let username = document.getElementById('friendUsername').value;
        this.props.addFriendHandler(username);
    }
}

export default AddFriendMenu;