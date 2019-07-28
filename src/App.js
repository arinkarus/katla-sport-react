import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import Home from './pages/Home';
import { Route } from 'react-router';
import { Switch } from 'react-router';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <Switch>
                <Route exact path='/' component={Home} />
            </Switch>
          </div>
        );
    }
}

export default connect(null, null)(App);

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
