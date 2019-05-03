import React from 'react'
import { Tab } from 'semantic-ui-react'
import UsersList from './UsersList';
import FriendsSection from './FriendsSection';
import { connect } from 'react-redux';




class UsersTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      following: []
    }
  }

  componentDidMount() {
    const { currUser, users } = this.props;
    const following = currUser.following.map(el => el)

    if (users.length !== 0) {
      let friends = [];
      for (const user of users) {

        const tempFollowing = currUser.following.filter(id => id === user._id);
        const tempFollowers = currUser.followers.filter(id => id === user._id);

        if (tempFollowing.length !== 0 && tempFollowers.length !== 0) {
          friends.push(user)
        }
      }
      this.setState({
        friends: friends
      })
    }

    this.setState({
      following: following
    })
  }

  addToFollowing = userId => {
    alert('addingTOfollll')
    const following = [...this.state.following, userId];
    debugger
    this.setState({
      following: following
    })
  }


  render() {
    const { following , friends} = this.state;

    const panes = [
      { menuItem: 'Friends', render: () => <Tab.Pane><FriendsSection friends={friends}/></Tab.Pane> },
      {
        menuItem: 'All users', render: () => <Tab.Pane><UsersList following={following}
          addToFollowing={this.addToFollowing} /></Tab.Pane>
      },
    ]
    return (
      <Tab panes={panes} />
    )
  }
}

const mapStateToProps = state => {
  return {
    currUser: state.auth.user,
    users: state.users.users
  }
}


export default connect(mapStateToProps, {})(UsersTabs);