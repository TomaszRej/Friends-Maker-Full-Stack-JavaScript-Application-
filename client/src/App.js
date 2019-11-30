import React, {Component} from 'react';
// import './App.css';
import Nav from './components/Nav';
import {Grid, Segment, Header, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';

import MainMenu from './components/MainMenu';
import PostsList from './components/PostsList';
import openSocket from 'socket.io-client';
import {getUsers} from './actions/userActions';
import {getPosts} from './actions/postActions';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {login, logout} from './actions/authActions';
import UsersTabs from './components/usersTabs/UsersTabs';
import ChatWindow from "./components/chat/ChatWindow";


class App extends Component {

  componentDidMount() {
    this.props.getUsers();
    this.props.getPosts();
  }


  renderPosts = () => {
    return <Segment>
      <div>test</div>
    </Segment>
  }

  render() {

    return (
      <BrowserRouter>
        <Grid padded centered style={{backgroundColor: '#f5f5f5'}}>
          <Grid.Row style={{backgroundColor: 'white'}}>
            <Grid.Column width="16">
              <Nav/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row id='main-content'>
            <Grid.Column width="13">
              <Segment style={{minHeight: '70vh'}}>
                {this.props.user &&
                <PostsList/>
                }
              </Segment>

              {this.props.activeChats.map((chat, index) => {
                return <ChatWindow step={index + 1} friend={chat.withFriend}/>
              })}
            </Grid.Column>

            {this.props.user &&
            <Grid.Column width="3">
              <UsersTabs/>
            </Grid.Column>
            }


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
    activeChats: state.chatReducer.activeChats,
    user: state.auth.user,
    isAuthanticated: state.auth.isAuthanticated,
    posts: state.posts.posts

  }
}

export default connect(mapStateToProps, {getUsers, getPosts, login,})(App);
