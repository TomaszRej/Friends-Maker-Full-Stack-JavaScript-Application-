import React from 'react';
import FriendsList from './FriendsList';
import InvitationsList from './InvitationsList';
import { List } from 'semantic-ui-react';

class FriendsSection extends React.Component {

  render() {
    return (
      <List divided relaxed>
        <List.Item>
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