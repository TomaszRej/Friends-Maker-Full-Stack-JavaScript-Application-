import React, {useEffect} from 'react'
import {Icon, List, Button, Popup, Grid, Header, GridColumn} from 'semantic-ui-react'
import {connect} from 'react-redux'
import areTheUsersFriends from '../../helpers/areTheUsersFriends'
import {follow} from '../../actions/userActions'

import InvitationItem from './InvitationItem'


const InvitationsList = (props) => {




  const handleAddFriendClick = (userToFollow) => {
    const {currUser, follow} = props
    follow(currUser._id, userToFollow._id)
  };


  const {updatedCurrUser} = props;

  const currUser = updatedCurrUser ? updatedCurrUser : props.currUser;
  const users = props.users;


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