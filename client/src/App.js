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

import {clearNotification} from "./actions/notificationActions";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showNotification: false
    }
  }


  componentDidMount() {
    this.props.getUsers();
    this.props.getPosts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (prevProps.notification !== this.props.notification) {
      if (this.props.notification.length !== 0)
        this.setState({
          showNotification: true
        });
      setTimeout(() => {

        this.setState({
          showNotification: false
        });

        this.props.clearNotification();

      }, 3000);


    }
  }


  renderPosts = () => {
    return <Segment>
      <div>test</div>
    </Segment>
  }

  render() {

    return (
      <BrowserRouter>
        {this.state.showNotification &&
        <div style={{
          flex: 1,
          justifyContent: "center",
          alignItems: 'center',
          textAlign: "center",
          fontSize: 40,
          color: "white",
          backgroundColor: "green",
          height: '200px',
          width: "100%",
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0
        }}>
          <div style={{marginTop: 50}}>{this.props.notification}</div>
        </div>

        }

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
    posts: state.posts.posts,
    notification: state.notificationReducer.notification

  }
};




export default connect(mapStateToProps, {getUsers, getPosts, login, clearNotification})(App);
