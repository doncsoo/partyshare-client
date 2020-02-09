import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Menu from './Menu';

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
    return(
      <div>
      <h1>PartyShare</h1>
      <div id="app">
        <div id="login">
        <input type="text" id="user" name="user" placeholder="Username"></input>
        <br></br>
        <input type="text" id="rid" name="rid" placeholder="Room number"></input>
        <br></br>
        <button id="other_button" onClick={() => this.tryToConnect(document.getElementById("rid").value,document.getElementById("user").value)}>Add</button>
        </div>
      </div>
      </div>
    )
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
    return
  }

  saveData()
  {
    sessionStorage.setItem("SessionUser",this.state.user);
    sessionStorage.setItem("SessionRoom",this.state.room_number);
  }
}

export default App;
