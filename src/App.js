import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  marginRight: 20,
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <MuiThemeProvider>
            <TextField
              type="number"
              hintText="$ How much?"
            />
            <TextField
              type="text"
              floatingLabelText="Add a note"
            />
            <div>
              <FloatingActionButton 
                style={style}
                onClick={()=>alert('Test')}
                >
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
