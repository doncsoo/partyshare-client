import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ImageUpload from './image_upload';
import YTUpload from './ytvideo_upload';
import {
    Redirect, Router
  } from 'react-router-dom'

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
        <div id="afterlogin">
        <div id="menu">
        <h4>Uploading as {this.props.user} to room #{this.props.room_id}</h4>
        <button class="button5" onClick={() => this.renderImgUpload()}>Add an image</button>
        <br></br>
        <button class="button5" onClick={() => this.renderYTUpload()}>Add a YT video</button>
        <br></br>
        <button class="button5" onClick={() => this.logOut()}>Logout</button>
        </div>
        <div id="upload_site">
        </div>
        </div>)
    }

    logOut()
    {
        sessionStorage.removeItem("SessionUser")
        sessionStorage.removeItem("SessionRoom")
        window.location.href="/"
    }

    returnMenu()
    {
        ReactDOM.unmountComponentAtNode(document.getElementById("upload_site"))
        document.getElementById("menu").style.display = "block"
    }

    renderImgUpload()
    {
        console.log("Rendering")
        document.getElementById("menu").style.display = "none"
        ReactDOM.render(<ImageUpload returnmenu={this.returnMenu} room_id={this.props.room_id} user={this.props.user}/>,document.getElementById("upload_site"))
    }
    
    renderYTUpload()
    {
        console.log("Rendering")
        document.getElementById("menu").style.display = "none"
        ReactDOM.render(<YTUpload returnmenu={this.returnMenu} room_id={this.props.room_id} user={this.props.user}/>,document.getElementById("upload_site"))
    }

}

export default Menu;