import React from 'react'
import {Tab} from 'semantic-ui-react'
import UsersList from './UsersList';
import FriendsSection from './FriendsSection';
import {connect} from 'react-redux';
import openSocket from "socket.io-client";
import {updateUser} from "../../actions/userActions";


class UsersTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedCurrUser: null,
      updatedUsers: []
    }
  }


  componentDidMount() {
    const socket = openSocket('http://localhost:8000');

    socket.on('follow', data => {

      const updatedUsers = this.props.users.map(user => {
        if (user._id === data.users[1]._id) {
          return data.users[1]
        } else if (user._id === data.users[0]._id) {
          return data.users[0]
        } else{
          return user
        }
      })



      if (this.props.currUser._id === data.users[0]._id) {
        this.setState({
          updatedCurrUser: data.users[0],
        })
      } else if(this.props.currUser._id === data.users[1]._id ){

        this.setState({
          updatedUsers: updatedUsers
        })
      }




    })
  }


  render() {


    const panes = [
      {
        menuItem: 'Friends',
        render: () => <Tab.Pane><FriendsSection
          updatedCurrUser={this.state.updatedCurrUser}
          updatedUsers={this.state.updatedUsers}
        /></Tab.Pane>
      },
      {
        menuItem: 'All users', render: () => <Tab.Pane><UsersList
          updatedCurrUser={this.state.updatedCurrUser}
          updatedUsers={this.state.updatedUsers}
        /></Tab.Pane>
      },
    ]
    return (
      <Tab panes={panes}/>
    )
  }
}

const mapStateToProps = state => {
  return {
    currUser: state.auth.user,
    users: state.users.users
  }
}


export default connect(mapStateToProps, {updateUser})(UsersTabs);