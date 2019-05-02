import React from 'react'
import { Tab } from 'semantic-ui-react'
import UsersList from './UsersList';
import FriendsList from './FriendsList';


const panes = [
  { menuItem: 'Friends', render: () => <Tab.Pane><FriendsList/></Tab.Pane> },
  { menuItem: 'All users', render: () => <Tab.Pane><UsersList/></Tab.Pane> },

]

// const TabExampleBasic = () => <Tab panes={panes} />

class UsersTabs extends React.Component {
  render() {
    return(
      <Tab panes={panes} />
    )
  }
}

export default UsersTabs;