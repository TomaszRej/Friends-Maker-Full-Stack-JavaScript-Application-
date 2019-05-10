import React from 'react'
import {Icon, List, Button, Popup, Grid, Header, GridColumn} from 'semantic-ui-react'
import {connect} from 'react-redux'
import areTheUsersFriends from '../../helpers/areTheUsersFriends'
import {follow} from '../../actions/userActions'
import openSocket from "socket.io-client"
import InvitationItem from './InvitationItem'


class InvitationsList extends React.Component {
  constructor(props) {
    super(props);


  }


  handleAddFriendClick = (userToFollow) => {
    const {currUser, follow} = this.props

    follow(currUser._id, userToFollow._id)

  }

  render() {
    const {updatedCurrUser, updatedUsers} = this.props

    const currUser = updatedCurrUser ? updatedCurrUser : this.props.currUser;
    const users = updatedUsers.length !== 0 ? updatedUsers : this.props.users;


    return (
      users.map(user => {

        if (areTheUsersFriends(currUser, user)) {
          return
        }
        const followers = currUser.followers.find(u => u === user._id);
        console.log(followers, 'followers')

        if (followers) {
          return <InvitationItem user={user}
                                 handleAddFriendClick={this.handleAddFriendClick}
          />
        }
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

export default connect(mapStateToProps, {follow})(InvitationsList);