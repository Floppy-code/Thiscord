import React, { Component } from 'react';

class LoginMenu extends React.Component {
    render() { 
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Login</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Username"></input>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="User password"></input>
                    </div>
                    <br/>
                    <button onClick={() => this.handleSubmit()} type="button" className="btn btn-primary" id='submitBtn'>Login</button>
                </form>
            </div>);
    }

    handleSubmit = () => {
        const name = document.getElementById('username').value;
        const accessLevel = document.getElementById('password').value;
        this.props.loginHandler(name, accessLevel);
    }
}
 
export default LoginMenu;