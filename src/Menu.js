import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ImageUpload from './image_upload';
import YTUpload from './ytvideo_upload';

class Menu extends Component
{
    state = {}

    constructor()
    {
        super()
    }

    render()
    {
        return(
        <div id="menu">
        <h4>Uploading as {this.props.user} to room #{this.props.room_id}</h4>
        <button id="menu_button" onClick={() => this.renderImgUpload()}>Add an image</button>
        <br></br>
        <button id="menu_button" onClick={() => this.renderYTUpload()}>Add a YT video</button>
        </div>)
    }

    renderImgUpload()
    {
        console.log("Rendering")
        ReactDOM.render(<ImageUpload room_id={this.props.room_id} user={this.props.user}/>,document.getElementById("app"))
    }
    
    renderYTUpload()
    {
        console.log("Rendering")
        ReactDOM.render(<YTUpload room_id={this.props.room_id} user={this.props.user}/>,document.getElementById("app"))
    }

}

export default Menu;