import React, {useEffect, useState} from 'react'
import {Tab} from 'semantic-ui-react'
import UsersList from './UsersList';
import FriendsSection from './FriendsSection';
import {connect} from 'react-redux';
import openSocket from "socket.io-client";
import {updateUser} from "../../actions/userActions";


const UsersTabs = (props) => {
const [updatedCurrUser, setUpdatedCurrUser] = useState(null);
const [updatedUsers, setUpdatedUsers] = useState([])


  useEffect(() => {
    const socket = openSocket('http://localhost:8000');

    socket.on('follow', data => {


      console.log(data.data.currUser, "currUser");
      console.log(props.loggedUser, "logeduser");
      console.log(data.data.user, "user");



      debugger

    })
  }, [])


  const panes = [
    {
      menuItem: 'Friends',
      render: () => <Tab.Pane><FriendsSection
        updatedCurrUser={updatedCurrUser}
        updatedUsers={updatedUsers}
      /></Tab.Pane>
    },
    {
      menuItem: 'All users', render: () => <Tab.Pane><UsersList
        updatedCurrUser={updatedCurrUser}
        updatedUsers={updatedUsers}
      /></Tab.Pane>
    },
  ]
  return (
    <Tab panes={panes}/>
  )

}

const mapStateToProps = state => {
  return {
    loggedUser: state.auth.user,
    users: state.users.users
  }
}


export default connect(mapStateToProps, {updateUser})(UsersTabs);