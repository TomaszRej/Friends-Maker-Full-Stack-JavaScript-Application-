import React, { Component } from 'react';
// import './App.css';
import Nav from './components/Nav';
import { Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import UsersList from './components/UsersList';
import MainMenu from './components/MainMenu';



class App extends Component {

  render() {
      console.log(this.props.user);
      
    return (
      
      <Grid padded centered >

        <Grid.Row>
          <Grid.Column width="14" >
            <Nav />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row id='main-content' >
          <Grid.Column width="2">
        
            <MainMenu />
  
          </Grid.Column>
          <Grid.Column width="10" stretched>
            <Segment>
              {this.props.user ? <div>hello {this.props.user.name}</div> : <div>World</div>}
            </Segment>
          </Grid.Column>
          <Grid.Column width="2">
              <UsersList />
          </Grid.Column>
        </Grid.Row>

  
  
  


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
