import React from 'react'
import {Icon, List, Button, ListContent, Grid, Header, Popup} from 'semantic-ui-react'
import {connect} from 'react-redux';
import { follow} from '../../actions/userActions';
import openSocket from 'socket.io-client';
import areTheUsersFriends from '../../helpers/areTheUsersFriends';
import UserItem from "./UserItem";


class UsersList extends React.Component {


  handleAddFriendClick = (userToFollow) => {
    const {currUser, follow} = this.props;

    follow(currUser._id, userToFollow._id);

  }

  render() {
    const { updatedCurrUser, updatedUsers} = this.props;


    const currUser = updatedCurrUser !== null ? updatedCurrUser : this.props.currUser;
    const users = updatedUsers.length !== 0 ? updatedUsers : this.props.users;


    const allUsersExceptTheLoggedOne = users.filter(u => u._id !== currUser._id);
    return (
      allUsersExceptTheLoggedOne.map(user => {

        //  const ifFollowing = currUser.following.find(followingId => followingId === user._id) ? true : false;
        const ifFollowing = currUser.following.find(u => u === user._id);


        if (areTheUsersFriends(currUser, user)) {
          return
        }

        return (
          <UserItem ifFollowing={!!ifFollowing}
                    user={user}
                    handleAddFriendClick={this.handleAddFriendClick}
          />
        )
      })
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    currUser: state.auth.user,
    // friends: state.users.friends
  }
}


export default connect(mapStateToProps, {follow})(UsersList);