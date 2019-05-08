import React from 'react'
import {Icon, List, Button, Popup, Grid} from 'semantic-ui-react'
import {connect} from 'react-redux';
import FriendItem from './FriendItem';
import openSocket from "socket.io-client";

class FriendsList extends React.Component {


  componentDidMount() {
    const socket = openSocket('http://localhost:8000');

    socket.on('follow', data => {
        this.setState({
          //
        })
    })
  }

  render() {
    const {users, currUser} = this.props;

    const friends = users.filter(user => {
      if (user.following.includes(currUser._id) && currUser.following.includes(user._id)) {
        return user
      }
    })

    return (
      friends.map(friend => {
        return <FriendItem friend={friend}/>
      })
    )
  }
}

const mapStateToProps = state => {
  return {
    currUser: state.auth.user,
    users: state.users.users,
  }
}


export default connect(mapStateToProps)(FriendsList);