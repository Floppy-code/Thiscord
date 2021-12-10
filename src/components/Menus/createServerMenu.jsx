import React, { Component } from 'react';
import DropzoneComponent from '../dropzoneComponent';
import {handlePOSTJSON, handlePOST} from '../DBRequestHandler';

class CreateServerMenu extends React.Component {
    state = {
        fileReceived: false,
        image: null
    }

    render() { 
        return (
            <div>
            <form method="POST" action="/upload" enctype="multipart/form-data" onSubmit={this.formSubmit}>
                <div className="form-group">
                <label htmlFor="exampleInputServer">Server name</label>
                <input type="text" name="text" className="form-control" id="serverName" aria-describedby="emailHelp" placeholder="Name"/>
                <br/>
                <input id='file' type="file" name="myFile" />
                <br/>
                <input type="submit" onClick={this.handleSubmit} value="SEND"/>
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

    handleSubmit = () => {      
        var formdata = new FormData();    
        formdata.append("image", this.state.image);
        
        var requestOptions = {
            method: 'POST',
            encType: "multipart/form-data",
            file: this.state.image,
        };

        fetch("file_input", requestOptions);
    }
}
 
export default CreateServerMenu;