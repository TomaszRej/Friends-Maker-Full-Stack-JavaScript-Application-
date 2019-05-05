import React from 'react'
import { Icon, List, Button, Popup, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux';
import areTheUsersFriends from '../../helpers/areTheUsersFriends';


class InvitationsList extends React.Component {



  render() {

    const { currUser, users, friends } = this.props;


    return (
      <>
        {users.map(user => {

          if (areTheUsersFriends(currUser, user)) {
            return
          }


          // zwracac tylko tych ktorzy maja currUser._id w user.following.
          if (user.following.find(u => u === currUser._id)) {
            return <List selection verticalAlign='middle'>
              <List.Item active={false} >
                <List.Content >
                  <Grid verticalAlign='middle'>
                    <Grid.Column width='12' style={{ display: 'flex', flexDirection: 'row' }}>
                      <Icon name='user' />
                      <List.Header>{user.name}</List.Header>
                    </Grid.Column>
                  </Grid>
                </List.Content>
              </List.Item>
            </List>
          }


        })}

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

export default connect(mapStateToProps)(InvitationsList);