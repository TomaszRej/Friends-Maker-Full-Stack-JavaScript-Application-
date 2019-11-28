import React, {useEffect} from 'react'
import {Icon, List, Button, Popup, Grid, Header, GridColumn} from 'semantic-ui-react'
import {connect} from 'react-redux'
import areTheUsersFriends from '../../helpers/areTheUsersFriends'
import {follow} from '../../actions/userActions'
import openSocket from "socket.io-client"
import InvitationItem from './InvitationItem'


const InvitationsList = (props) => {


  useEffect(() => {
    const socket = openSocket('http://localhost:8000');
    socket.on('follow', data => {


      alert(JSON.stringify(data))

    });
  },[]);

  const handleAddFriendClick = (userToFollow) => {
    const {currUser, follow} = props
    follow(currUser._id, userToFollow._id)
  };


  const {updatedCurrUser, updatedUsers} = props

  const currUser = updatedCurrUser ? updatedCurrUser : props.currUser;
  const users = updatedUsers.length !== 0 ? updatedUsers : props.users;


  return (
    users.map(user => {

      if (areTheUsersFriends(currUser, user)) {
        return
      }
      const followers = currUser.followers.find(u => u === user._id);
      console.log(followers, 'followers')

      if (followers) {
        return <InvitationItem user={user}
                               handleAddFriendClick={handleAddFriendClick}
        />
      }
    })

  )

};

const mapStateToProps = state => {
  return {
    currUser: state.auth.user,
    users: state.users.users,
  }
}

export default connect(mapStateToProps, {follow})(InvitationsList);