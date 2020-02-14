import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class YTUpload extends Component
{
    state = {}

    constructor()
    {
        super()
        this.state = {s_result : undefined, curr : 0}
    }
    render()
    {
        return(
            <div id="video_search">
                <div id="search">
                <h1>Upload YT video</h1> 
        <label>Enter the video's name you wish to upload. We'll try to search it for you!</label>
        <br></br>
         <input id="videotitle"></input>
         <br></br>
         <button id="other_button" onClick={() => this.searchForVideo(document.getElementById("videotitle").value)}>Search</button>
          <button id="other_button" onClick={() => this.props.returnmenu()}>Back</button>
            </div>
            </div>
        )
    }

    async searchForVideo(search_term)
    {
        var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&order=relevance&q=" + search_term + "&key=AIzaSyBxkx16j2dZPQc-ZRDACaAfwilFR5BCtRc"
        var searchresult = await fetch(url).then(res => res.json())
        this.setState({s_result : searchresult})
        this.nextResult()
    }

    failure()
    {
        var html_code = 
        <div id="result">
            <label>We couldn't find the desired video. Please try again.</label>
            <br></br>
            <button id="other_button" onClick={() => this.props.returnmenu()}>Back</button>
        </div>;
        ReactDOM.render(html_code, document.getElementById('video_search'));
    }

    nextResult()
    {
        if(this.state.curr == 30)
        {
            this.failure();
            return
        }
        var item = this.state.s_result.items[this.state.curr]
        var html_code = 
        <div id="result">
            <label>Do you want to send this video?</label>
            <img width="320" height="180" src={item.snippet.thumbnails.medium.url}></img>
            <h3>{item.snippet.title}</h3>
            <br></br>
            <label>Uploaded by: {item.snippet.channelTitle}</label>
            <br></br>
            <button id="other_button" onClick={() => this.upload(item.id.videoId)}>Upload</button>
            <br></br>
            <button id="other_button" onClick={() => this.nextResult()}>Next Result</button>
            <br></br>
            <button id="other_button" onClick={() => this.props.returnmenu()}>Back</button>
        </div>;
        if(this.state.curr == 0)
        {
            document.getElementById("video_search").innerHTML = ""
        }
        else if(this.state.curr > 0)
        {
            ReactDOM.unmountComponentAtNode(document.getElementById("video_search"));
        }
        this.setState({curr : this.state.curr + 1})
        ReactDOM.render(html_code, document.getElementById('video_search'));
    }

    upload(videoid)
    {
        var sendurl = "https://partyshare-server.herokuapp.com/room_push_video/" + this.props.room_id +"/" +
        this.props.user + "/" + videoid
        fetch(sendurl, {
            method: 'POST'
        })
        var success_html = 
        <div id="result">
            <label>Your video was sent!</label>
            <br></br>
            <button id="other_button" onClick={() => this.props.returnmenu()}>Back</button>
        </div>;
        ReactDOM.render(success_html, document.getElementById('video_search'));
    }
}

export default YTUpload;