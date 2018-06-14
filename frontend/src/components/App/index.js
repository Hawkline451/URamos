import React, { Component } from 'react';
import './App.css';
import Main from '../Main';



class App extends Component {

  render() {
    console.log(this.props.match)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">URamos</h1>
        </header>
        <Main />


      <form method="post" action="localhost:3000/auth">
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>




      </div>
    );
  }
}

export default App;
