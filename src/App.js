import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Menu from './Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

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
      <h1>PartyShare</h1>
      <div id="app">
        <div id="login">
        <input type="text" id="user" name="user" placeholder="Username"></input>
        <br></br>
        <Switch>
        <Route path="/room/">
        <h3>Uploading to room #{room_id}</h3>
        </Route>
        <Route path="/">
        <input type="text" id="rid" name="rid" placeholder="Room number"></input>
        </Route>
        </Switch>
        <br></br>
        <button id="other_button" onClick={() => this.tryToConnect(this.getRoomId(room_id),document.getElementById("user").value)}>Add</button>
        </div>
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
    if(sessionStorage.getItem("SessionUser") && sessionStorage.getItem("SessionRoom"))
    {
      this.tryToConnect(sessionStorage.getItem("SessionRoom"),sessionStorage.getItem("SessionUser"))
    }
  }

  async tryToConnect(roomid,username)
  {
    console.log(roomid)
    var response = await fetch("https://partyshare-server.herokuapp.com/get_room/" + roomid)
         .then(resp => resp.text())
    if(response == "OK")
    {
      this.setState({room_number : roomid})
      this.setState({user : username})
      this.saveData()
      var rem = document.getElementById("login")
      rem.parentNode.removeChild(rem)
      ReactDOM.render(<Menu room_id={roomid} user={username}/>,document.getElementById("app"))
    }
    else
    {
      document.getElementById("app").innerHTML += "<div id='errors'><h4>" + response + "</h4></div>"
    }
  }

  saveData()
  {
    sessionStorage.setItem("SessionUser",this.state.user);
    sessionStorage.setItem("SessionRoom",this.state.room_number);
  }
}

export default App;
