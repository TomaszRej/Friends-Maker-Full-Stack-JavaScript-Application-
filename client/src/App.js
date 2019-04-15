import React, { Component } from 'react';
// import './App.css';
import Nav from './components/Nav';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

class App extends Component {

  render() {

    return (
      <Grid padded centered>
        <Grid.Column width="12">
          <Nav />
          {this.props.user ? <div>hello</div> : <div>World</div>}


        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(App);
