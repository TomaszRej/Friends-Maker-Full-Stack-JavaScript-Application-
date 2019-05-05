import React from 'react';
import FriendsList from './FriendsList';
import InvitationsList from './InvitationsList';
import { Header, List } from 'semantic-ui-react';

class FriendsSection extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (

      <List divided relaxed>
        <List.Item>
          You have no invitation
          <InvitationsList/>
        </List.Item>
        <List.Item>
          <FriendsList />
        </List.Item>
      </List>



    )
  }
}



export default FriendsSection;