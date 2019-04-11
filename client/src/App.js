import React, { Component } from 'react';
// import './App.css';
import Nav from './components/Nav';
import {  Grid } from 'semantic-ui-react';


class App extends Component {

  render() {
   
    return (
      <Grid padded centered>
        <Grid.Column width="12">
          <Nav/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
