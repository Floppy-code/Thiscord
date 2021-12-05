import React, { Component } from 'react';
import DropzoneComponent from '../dropzoneComponent';

class CreateServerMenu extends React.Component {
    render() { 
        return (
            <div>
            <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Server name</label>
                <input type="text" className="form-control" id="serverName" aria-describedby="emailHelp" placeholder="Name"></input>
            </div>
            <br/>
            <button onClick={() => this.handleSubmit()} type="button" className="btn btn-primary" id='submitBtn'>Connect</button>
            </form>
            <br/>
            <DropzoneComponent fileHandler={this.handleFileDropped}/>
            </div>
        );
    }

    handleFileDropped = (file) => {
        console.log('Received file:', file);
        
        //Save to disk
        let photo = file[0];
        let formData = new FormData();

        formData.append("photo", photo);
        fetch('/images/', {method: "POST", body: formData});
    }

    handleSubmit = () => {

        this.props.createServerHandler();
    }
}
 
export default CreateServerMenu;