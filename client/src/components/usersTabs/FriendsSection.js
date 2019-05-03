import React from 'react';
import FriendsList from './FriendsList';

class FriendsSection extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <>
        <FriendsList friends={this.props.friends}/>
      </>

    )
  }
}

export default FriendsSection;