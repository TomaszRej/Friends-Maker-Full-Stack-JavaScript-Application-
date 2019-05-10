import React from 'react'
import {Icon, List, Button, Popup, Grid} from 'semantic-ui-react'
import {connect} from 'react-redux';
import FriendItem from './FriendItem';
//import {updateUser} from '../../actions/userAction';
import openSocket from "socket.io-client";
import areTheUsersFriends from '../../helpers/areTheUsersFriends';

import {updateUser} from "../../actions/userActions";

class FriendsList extends React.Component {

  render() {
    const { updatedCurrUser, updatedUsers} = this.props;

    const currUser = updatedCurrUser !== null ? updatedCurrUser : this.props.currUser;
    const users = updatedUsers.length !== 0  ? updatedUsers : this.props.users;



    const friends = users.filter(user => {
      if (areTheUsersFriends(currUser, user)) {
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


export default connect(mapStateToProps, {updateUser})(FriendsList);