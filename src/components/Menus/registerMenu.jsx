import React, { Component } from 'react';

class RegisterMenu extends React.Component {
    render() { 
        return (
            <div>
            <form method="POST" action="/register" enctype="multipart/form-data">
                <div className="form-group">
                <label htmlFor="exampleInputServer">Username</label>
                <input type="text" name="username" className="form-control" id="serverName" aria-describedby="emailHelp" placeholder="Name"/>
                <br/>
                <label htmlFor="exampleInputServer">Password</label>
                <input type="password" name="password" className="form-control" id="serverName" aria-describedby="emailHelp" placeholder="Name"/>
                <input id='file' type="file" name="myFile" />
                <br/>
                <input type="submit" value="SEND"/>
                </div>
            </form>
            </div>
        );
    }
}
 
export 

default RegisterMenu;