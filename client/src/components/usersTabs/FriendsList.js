import React from 'react'
import { Icon, List, Button, Popup, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions';


class FriendsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: []
    }
  }

  // componentDidMount() {
  //   const { currUser, users } = this.props;

  //   if (users.length !== 0) {
  //     let friends = [];
  //     for (const user of users) {

  //       const tempFollowing = currUser.following.filter(id => id === user._id);
  //       const tempFollowers = currUser.followers.filter(id => id === user._id);

  //       if (tempFollowing.length !== 0 && tempFollowers.length !== 0) {
  //         friends.push(user)
  //       }
  //     }
  //     this.setState({
  //       friends: friends
  //     })
  //   }

  // }

  render() {

    // const { friends } = this.state;

    const { friends, FRIENDS } = this.props;



    return (
      <>
        {FRIENDS.length !== 0 ? FRIENDS.map(friend => {
          return <List selection verticalAlign='middle'>
            <List.Item active={false} >
              <List.Content >
                <Grid verticalAlign='middle'>
                  <Grid.Column width='12' style={{ display: 'flex', flexDirection: 'row' }}>
                    <Icon name='user' />
                    <List.Header>{friend.name}</List.Header>
                  </Grid.Column>
                </Grid>
              </List.Content>
            </List.Item>
          </List>
        }) : <div>You don't have any friends yet</div>}



      </>
    )


  }
}

const mapStateToProps = state => {
  return {
    currUser: state.auth.user,
    users: state.users.users,
    FRIENDS: state.users.friends
  }
}


export default connect(mapStateToProps)(FriendsList);