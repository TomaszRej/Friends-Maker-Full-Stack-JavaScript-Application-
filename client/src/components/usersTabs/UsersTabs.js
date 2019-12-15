import React, {useEffect, useState} from 'react'
import {Tab} from 'semantic-ui-react'
import UsersList from './UsersList';
import FriendsSection from './FriendsSection';
import {useSelector, useDispatch} from 'react-redux';
import openSocket from "socket.io-client";
import {updateLoggedUser} from "../../actions/authActions";
import {notifyAction} from '../../actions/notificationActions';

const UsersTabs = (props) => {
  const [updatedCurrUser, setUpdatedCurrUser] = useState(null);
  const loggedUser = useSelector(state => state.auth.user);
  const dispatch = useDispatch();


  useEffect(() => {
    const socket = openSocket('http://localhost:8000');

    //todo instead of local state dispatch action which will update user profile

    socket.on('follow', data => {

      const newUser = {...loggedUser};

      if (loggedUser._id === data.data.user._id) {
        newUser.followers.push(data.data.currUser._id);
        if (loggedUser.following.includes(data.data.currUser._id)) {
          dispatch(notifyAction({message: `You are now friend with ${data.data.currUser.name}`}))
        }

      }

      if (loggedUser._id === data.data.currUser._id) {
        newUser.following.push(data.data.user._id);
        if (loggedUser.followers.includes(data.data.user._id)) {
          dispatch(notifyAction({message: `You are now friend with ${data.data.user.name}`}))
        }
      }

      dispatch(updateLoggedUser(newUser))
      // setUpdatedCurrUser(newUser);


    })
  }, []);


  const panes = [
    {
      menuItem: 'Friends',
      render: () => <Tab.Pane><FriendsSection


      /></Tab.Pane>
    },
    {
      menuItem: 'All users', render: () => <Tab.Pane><UsersList
        updatedCurrUser={updatedCurrUser}
      /></Tab.Pane>
    },
  ];

  return (
    <Tab panes={panes}/>
  )

};


export default UsersTabs;