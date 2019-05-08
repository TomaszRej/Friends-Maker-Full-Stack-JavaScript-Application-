import React from 'react'
import {Icon, List, Button, ListContent, Grid, Header, Popup} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getUsers, follow} from '../../actions/userActions';
import openSocket from 'socket.io-client';
import areTheUsersFriends from '../../helpers/areTheUsersFriends';
import UserItem from "./UserItem";


class UsersList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      updatedCurrUser: null,
      following: [],
      users: [],

    }
  }


  componentDidMount() {
    const { getUsers, currUser} = this.props;
    const following = currUser.following.slice();

    this.setState({
      following: following
    })

    const socket = openSocket('http://localhost:8000');

    socket.on('follow', data => {
      this.setState({
        //
      })
    });
  }


  handleAddFriendClick = (userToFollow) => {
    const {currUser, follow, getUsers, addToFollowing} = this.props;


    follow(currUser._id, userToFollow._id);

    const following = this.state.following.slice().concat(userToFollow._id)
    console.log(typeof addToFollowing, 'isFunction');

    if (typeof addToFollowing === 'function') {
      addToFollowing(userToFollow._id);
    }


    this.setState({

      following: following
    })

  }

  render() {
    const {currUser, following, users, friends} = this.props;
    // const { users, updatedCurrUser} = this.state;


    const allUsersExceptTheLoggedOne = users.filter(u => u._id !== currUser._id);
    return (
      allUsersExceptTheLoggedOne.map(user => {

        const ifFollowing = following.find(followingId => followingId === user._id);
        console.warn(areTheUsersFriends(currUser, user), "TEST ARE USERS FRIENDS")

        if (areTheUsersFriends(currUser, user)) {
          return
        }

        return (
            <UserItem ifFollowing={ifFollowing}
                      user={user}
                      handleAddFriendClick={this.handleAddFriendClick}/>
        )
      })
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    currUser: state.auth.user,
    friends: state.users.friends
  }
}


export default connect(mapStateToProps, {getUsers, follow})(UsersList);