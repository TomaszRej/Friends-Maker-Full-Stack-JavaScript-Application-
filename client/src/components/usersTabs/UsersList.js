import React from 'react'
import { Icon, List, Button, ListContent, Grid, Header ,Popup} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getUsers, follow } from '../../actions/userActions';




class UsersList extends React.Component {

  handleAddFriendClick = (userToFollow) => {
    const {currUser, follow } = this.props;
    follow(currUser._id, userToFollow._id);
  }

  render() {
    const {currUser, users} = this.props;
    const allUsersExceptTheLoggedOne = users.filter(u => u._id !== currUser._id );

    return (
      allUsersExceptTheLoggedOne.map(user => {
        return (
          <List selection verticalAlign='middle'>
            <List.Item active={false} >
              <List.Content >
                <Grid verticalAlign='middle'>
                  <Grid.Column width='12' style={{ display: 'flex', flexDirection: 'row' }}>
                    <Icon name='user' />
                    <List.Header>{user.name}</List.Header>
                  </Grid.Column>
                  <Grid.Column width='4' >

                  <Popup trigger={<Button circular icon='add' onClick={() => this.handleAddFriendClick(user)}/>} content='Send the invitation' />
                  
                  <Popup trigger={<Button circular positive icon='check'  onClick={this.handleAddBtnClick}/>} content='Send the invitation' />
                  </Grid.Column>
                </Grid>

              </List.Content>
            </List.Item>
          </List>
        )
      })
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    currUser: state.auth.user
  }
}


export default connect(mapStateToProps, { getUsers, follow })(UsersList);