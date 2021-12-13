import React, { Component } from 'react';
import DropzoneComponent from '../dropzoneComponent';
import {handlePOSTJSON, handlePOST} from '../DBRequestHandler';

class CreateServerMenu extends React.Component {
    state = {
        fileReceived: false,
        image: null
    }

    componentDidMount() {
        document.getElementById('userID').value = this.props.userID;
    }

    render() { 
        return (
            <div>
            <form method="POST" action="/create_server" enctype="multipart/form-data">
                <div className="form-group">
                <label htmlFor="exampleInputServer">Server name</label>
                <input type="text" style={{'display' : 'none'}} name="userID" className="form-control" id="userID" aria-describedby="emailHelp" placeholder="Name"/>
                <input type="text" name="text" className="form-control" id="serverName" aria-describedby="emailHelp" placeholder="Name"/>
                <br/>
                <input id='file' type="file" name="myFile" />
                <br/>
                <input type="submit" value="SEND"/>
                </div>
            </form>
            </div>
        );
    }

    formSubmit = (event) => {
        event.preventDefault();
    }

    handleFileDropped = (input) => {
        console.log(input);
    }
}
 
export default CreateServerMenu;