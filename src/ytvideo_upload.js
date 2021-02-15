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
                <label><b>Upload YT video</b></label>
                <br></br>
        <label>Enter the video's name you wish to upload. We'll try to search it for you!</label>
        <br></br>
         <input class="videoinput" id="videotitle"></input>
         <br></br>
         <button class="button5" onClick={() => this.searchForVideo(document.getElementById("videotitle").value)}>Search</button>
          <button class="button5" onClick={() => this.props.returnmenu()}>Back</button>
            </div>
            </div>
        )
    }

    async searchForVideo(search_term)
    {
        document.getElementById("app").style.display = "none";
        document.getElementById("loading").style.display = "block";
        var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&order=relevance&q=" + search_term + "&key=AIzaSyC3klBeG4FWXEY53ooMcduNzDxakdalv54"
        var searchresult = await fetch(url).then(res => res.json())
        this.setState({s_result : searchresult})
        if(searchresult.items.length == 0)
        {
            this.failure()
        }
        else
        {
            this.nextResult()
        }
        document.getElementById("app").style.display = "block";
        document.getElementById("loading").style.display = "none";
    }

    failure()
    {
        var html_code = 
        <div id="result">
            <label><b>We couldn't find the desired video. Please try again.</b></label>
            <br></br>
            <button class="button5" onClick={() => this.props.returnmenu()}>Back</button>
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
            <label><b>{item.snippet.title}</b></label>
            <br></br>
            <label>Uploaded by: {item.snippet.channelTitle}</label>
            <br></br>
            <button class="button5" onClick={() => this.upload(item.id.videoId)}>Send</button>
            <button class="button5" onClick={() => this.nextResult()}>Next Result</button>
            <br></br>
            <button class="button5" onClick={() => this.props.returnmenu()}>Back</button>
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
            <label><b>Your video was sent!</b></label>
            <br></br>
            <button class="button5" onClick={() => this.props.returnmenu()}>Back</button>
        </div>;
        ReactDOM.render(success_html, document.getElementById('video_search'));
    }
}

export default YTUpload;