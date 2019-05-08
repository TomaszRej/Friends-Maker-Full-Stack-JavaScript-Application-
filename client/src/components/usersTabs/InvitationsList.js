import React from 'react'
import {Icon, List, Button, Popup, Grid, Header, GridColumn} from 'semantic-ui-react'
import {connect} from 'react-redux'
import areTheUsersFriends from '../../helpers/areTheUsersFriends'
import {follow} from '../../actions/userActions'
import openSocket from "socket.io-client"
import InvitationItem from './InvitationItem'

class InvitationsList extends React.Component {

  componentDidMount() {
    const socket = openSocket('http://localhost:8000')

    socket.on('follow', data => {
      this.setState({
        //
      })
    })
  }


  handleAddFriendClick = (userToFollow) => {
    const {currUser, follow} = this.props

    follow(currUser._id, userToFollow._id)

  }

  render() {
    const {currUser, users} = this.props

    return (
      users.map(user => {

        if (areTheUsersFriends(currUser, user)) {
          return
        }

        if (user.following.find(u => u === currUser._id)) {
          return <InvitationItem user={user} handleAddFriendClick={this.handleAddFriendClick}/>
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