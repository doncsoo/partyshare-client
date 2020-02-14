import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class ImageUpload extends Component
{

    render()
    {
        return(
            <div id="image_upload">
                <div id="upload">
                <h1>Upload Image</h1>
                <form id="send_form" method="post" enctype="multipart/form-data">
                <input type="file" accept="image/*" name="image"/>
                </form>
                <button id="other_button" onClick={() => this.upload()}>Send</button>
                <button id="other_button" onClick={() => this.props.returnmenu()}>Back</button>
            </div>
            </div>
        )
    }

    async upload()
    {
        function success()
        {
        var success_html = 
        <div id="result">
            <label>Your image was sent!</label>
            <br></br>
            <button id="other_button" onClick={() => window.location.href="/"}>Back</button>
        </div>;
        ReactDOM.render(success_html, document.getElementById('image_upload'));
        }

        function failure()
        {
        var success_html = 
        <div id="result">
            <label style={{color: "red"}}>Your image was not uploaded for some reason! Please try again!</label>
            <br></br>
            <button id="other_button" onClick={() => window.location.href="/"}>Back</button>
        </div>;
        ReactDOM.render(success_html, document.getElementById('image_upload'));
        }

        document.getElementById("upload").innerHTML += "<h4>Uploading...</h4>"
        let formData = new FormData(document.getElementById("send_form"));
        //const photos = document.querySelector('input[type="file"]');
        //formData.append("image",photos.files[0])
        await fetch("https://partyshare-server.herokuapp.com/room_push_img/" + this.props.room_id + "/" + this.props.user, {
            method: 'POST',
            body: formData
          })
          .then(function(resp)
          {
              if(resp.status == 200) success();
              else failure();
          })   
    }
}

export default ImageUpload;