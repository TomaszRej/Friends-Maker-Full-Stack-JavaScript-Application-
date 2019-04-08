import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import { Container } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Container>
        <Nav/>
        <div>
          test
        </div>
      </Container>
    );
  }
}

export default App;
