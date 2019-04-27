import React, { Component } from 'react';
// import './App.css';
import Nav from './components/Nav';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import UsersList from './components/UsersList';
import MainMenu from './components/MainMenu';
import openSocket from 'socket.io-client';
import { getUsers } from './actions/userActions';

class App extends Component {


  // constructor(){
  //   super();

  //   this.state = {
  //     users: []
  //   }
  // }

  // componentDidMount() {
  //   console.log(this.props.users , 'users z propsa')
  //     this.setState({
  //       users: this.props.users
  //     })

  //   const socket = openSocket('http://localhost:8000');
  //   socket.on('users', data => {
  //     const users = this.state.users.slice();

  //     if (data.action === 'create') {
  //       console.log('test socket na usr created :}}}');
  //       console.warn('Created user', data.user)
  //       users.push(data.user);
  
  //       this.setState({
  //         users: users
  //       })

  //     }
  //   })
  // }

  render() {
    console.log(this.props.users, 'this.props.users z App');

    return (

      <Grid padded centered >

        <Grid.Row>
          <Grid.Column width="14" >
            <Nav />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row id='main-content' >
          <Grid.Column width="2">

          </Grid.Column>
          <Grid.Column width="10" stretched>
            <Segment centered textAlign='center'>
              <Header as='h1'>Welcome</Header>

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
    user: state.auth.user,

  }
}

export default connect(mapStateToProps, {getUsers})(App);
