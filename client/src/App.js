import React, { Component } from 'react';
// import './App.css';
import Nav from './components/Nav';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import UsersList from './components/UsersList';
import MainMenu from './components/MainMenu';
import openSocket from 'socket.io-client';
import { getUsers } from './actions/userActions';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import  {login}  from './actions/authActions';



class App extends Component {

  // async componentWillMount(){

  //   const { login } = this.props;
  //   const user = await localStorage.getItem('user');
  //   console.warn(user.email, 'USERRRRRRR')
  //   const email = user.email;
  //   const password = '123456';
  //   const loginData = { email, password };

   
  //   login(loginData)


  //   //login(user);



  // }

  renderPosts = () => {
    return <Segment ><div>test</div></Segment>
  }

  render() {
    return (
      <BrowserRouter>
        <Grid padded centered >
          <Grid.Row>
            <Grid.Column width="14" >
              <Nav />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row id='main-content' >
            <Grid.Column width="12">
              <Segment style={{ minHeight: '70vh' }}>
                {this.props.user &&
                  <Grid padded centered >
                    <Grid.Row>
                      <Grid.Column width="6" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button fluid primary>Add Post</Button>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width="6" style={{ display: 'flex', justifyContent: 'center' }}>
                        {this.renderPosts()}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                }
              </Segment>
            </Grid.Column>
            <Grid.Column width="2">
              <UsersList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </BrowserRouter>

      // <BrowserRouter>
      //   <Switch>
      //     <Route exact path='/' component={App} />
      //   </Switch>
      // </BrowserRouter>




      // <Grid padded centered >
      //   <Grid.Row>
      //     <Grid.Column width="14" >
      //       <Nav />
      //     </Grid.Column>
      //   </Grid.Row>
      //   <Grid.Row id='main-content' >
      //     <Grid.Column width="2">
      //       <MainMenu />
      //     </Grid.Column>
      //     <Grid.Column width="10" stretched style={{ minHeight: '50vh' }}>
      //       <Segment centered textAlign='center'>
      //         <Header as='h1'>Welcome</Header>
      //       </Segment>
      //     </Grid.Column>
      //     <Grid.Column width="2">
      //       <UsersList />
      //     </Grid.Column>
      //   </Grid.Row>
      // </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,

  }
}

export default connect(mapStateToProps, { getUsers, login })(App);
