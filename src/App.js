import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Menu from './Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import logo from './partysharelogo.png';
import loading from './loading.gif';

class App extends Component 
{
  state = {}

  constructor()
  {
    super();
    this.state = {room_number : -1, user : undefined}
  }

  componentDidMount()
  {
    this.preAuthenticate()
  }

  render()
  {
    const query = new URLSearchParams(window.location.search);
    var room_id = query.get('rid')
    return(
      <Router>
      <div>
      <img id="logo" width="400" height="230" src={logo} alt="Logo"></img>
      <div id="loading" style={{display:"none"}}>
      <img id="loading" width="100" height="100" src={loading} alt="Loading"></img>
      </div>
      <div id="app">
        <Switch>
        <Route path="/img_success">
        <label><b>Upload succeeded.</b></label>
        <br></br>
        <button class="button5" onClick={() => window.location.href="/"}>Back</button>
        </Route>
        <Route path="/">
        <div id="login">
        <input type="text" id="user" name="user" placeholder="Username"></input>
        <br></br>
        <Switch>
        <Route path="/room/">
        <label><b>Uploading to room #{room_id}</b></label>
        </Route>
        <Route path="/">
        <input type="text" id="rid" name="rid" placeholder="Room number"></input>
        </Route>
        </Switch>
        <br></br>
        <button class="button5" onClick={() => this.tryToConnect(this.getRoomId(room_id),document.getElementById("user").value)}>Enter</button>
        </div>
        </Route>
        </Switch>
      </div>
      </div>
      </Router>
      
    )
  }

  getRoomId(room_id)
  {
    if(room_id == null)
    {
      return document.getElementById("rid").value;
    }
    else return room_id;
  }

  preAuthenticate()
  {
    if(sessionStorage.getItem("SessionUser") && sessionStorage.getItem("SessionRoom") && document.getElementById("login"))
    {
      this.tryToConnect(sessionStorage.getItem("SessionRoom"),sessionStorage.getItem("SessionUser"))
    }
  }

  async tryToConnect(roomid,username)
  {
    if(roomid == '' && username == '')
    {
      alert("Please fill out the details to connect to the room.")
      return
    }
    document.getElementById("app").style.display = "none";
    document.getElementById("loading").style.display = "block";
    var response = await fetch("https://partyshare-server.herokuapp.com/get_room/" + roomid)
         .then(resp => resp.text())
    if(response == "OK")
    {
      this.setState({room_number : roomid})
      this.setState({user : username})
      this.saveData()
      var rem = document.getElementById("login")
      if(rem != undefined)
      {
        rem.parentNode.removeChild(rem)
      } 
      else return
      ReactDOM.render(<Menu room_id={roomid} user={username}/>,document.getElementById("app"))
    }
    else
    {
      alert("An error occurred during the log-in: " + response)
    }
    document.getElementById("app").style.display = "block";
    document.getElementById("loading").style.display = "none";
  }

  saveData()
  {
    sessionStorage.setItem("SessionUser",this.state.user);
    sessionStorage.setItem("SessionRoom",this.state.room_number);
  }
}

export default App;
