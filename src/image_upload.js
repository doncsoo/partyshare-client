import React, {Component} from 'react';
import './App.css';

class ImageUpload extends Component
{

    render()
    {
        var urlstr = "https://partyshare-server.herokuapp.com/room_push_img/" + this.props.room_id + "/" + this.props.user
        return(
            <div id="image_upload">
                <div id="upload">
                <h1>Upload Image</h1>
 
 <form action={urlstr}  method="post" enctype="multipart/form-data">
         <input type="file" accept="image/*" name="image" ></input>
         <input type="submit" value="upload"></input>
 </form>
          <button id="other_button" onClick={() => this.props.returnmenu()}>Back</button>
            </div>
            </div>
        )
    }

    success()
    {
        document.getElementById("image_upload").innerHTML = "<label>Your image was sent!</label>"
    }
}

export default ImageUpload;