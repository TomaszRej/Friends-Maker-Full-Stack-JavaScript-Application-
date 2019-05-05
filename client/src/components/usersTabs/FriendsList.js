import React from 'react'
import { Icon, List, Button, Popup, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions';


class FriendsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }



  render() {



    const { friends } = this.props;



    return (
      <>
        {friends.length !== 0 ? friends.map(friend => {

 

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
    friends: state.users.friends
  }
}


export default connect(mapStateToProps)(FriendsList);