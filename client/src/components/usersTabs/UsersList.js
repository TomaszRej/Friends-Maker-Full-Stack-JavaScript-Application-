import React from 'react'
import { Icon, List, Button, ListContent, Grid, Header, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getUsers, follow, updateUser } from '../../actions/userActions';
import openSocket from 'socket.io-client';
import areTheUsersFriends from '../../helpers/areTheUsersFriends';


class UsersList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      updatedCurrUser: this.props.currUser,
      following: [],
      users: [],

    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.warn(nextProps.users, 'nextPropsUsers')

  //   const { currUser } = this.props;

  //   const users = nextProps.users;



  //   const u = users.find(el => el._id === currUser._id)

  //   const following = u.following.slice();
  //   this.setState({
  //     users: users,
  //     following: following
  //   })


  // }





  componentDidMount() {
    const { updateUser, getUsers, users, currUser } = this.props;
    const following = currUser.following.slice();

    this.setState({
      users: users,
      following: following
    })

    const socket = openSocket('http://localhost:8000');
    socket.on('follow', data => {
      for (const user of data.users) {
        updateUser(user);

        // this.updateUsers(user);
      }
      //getUsers();
    });
  }



  // updateUsers = user => {
  //   const { currUser } = this.props;

  //   const users = this.state.users.slice().map(u => {
  //     if (u._id === user._id) {
  //       return user

  //     } else {
  //       return u;
  //     }
  //   })

  //   const updatedCurrUser = users.find(el => el._id === currUser._id);

  //   const following = updatedCurrUser.following.slice();

  //   this.setState({
  //     updatedCurrUser: updatedCurrUser,
  //     users: users,
  //     following: following
  //   })
  // }




  handleAddFriendClick = (userToFollow) => {
    const { currUser, follow, getUsers, addToFollowing } = this.props;
    follow(currUser._id, userToFollow._id);

    const following = this.state.following.slice().concat(userToFollow._id)
    console.log(typeof addToFollowing, 'isFunction');

    if (typeof addToFollowing === 'function') {
      addToFollowing(userToFollow._id);
    }


    this.setState({

      following: following
    })

  }

  render() {
    const { currUser, following, users, friends } = this.props;
    // const { users, updatedCurrUser} = this.state;



    const allUsersExceptTheLoggedOne = users.filter(u => u._id !== currUser._id);
    return (
      allUsersExceptTheLoggedOne.map(user => {

        const ifFollowing = following.find(followingId => followingId === user._id);
        console.warn(areTheUsersFriends(currUser, user), "TEST ARE USERS FRIENDS")

        if(areTheUsersFriends(currUser, user)){
          return
        }

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


                    {ifFollowing ?

                      <Button circular positive icon='check' onClick={this.handleAddBtnClick} />

                      :
                      <Popup trigger={<Button circular icon='add' onClick={() => this.handleAddFriendClick(user)} />} content='Send the invitation' />
                    }
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
    currUser: state.auth.user,
    friends: state.users.friends
  }
}


export default connect(mapStateToProps, { getUsers, follow, updateUser })(UsersList);