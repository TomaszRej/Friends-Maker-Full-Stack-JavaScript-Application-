import React from 'react'
import { Tab } from 'semantic-ui-react'
import UsersList from './UsersList';
import FriendsSection from './FriendsSection';
import { connect } from 'react-redux';




class UsersTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      following: []
    }
  }

  componentDidMount() {
    const { currUser} = this.props;
    const following = currUser.following.map(el => el)

    this.setState({
      following: following
    })
  }

  addToFollowing = userId => {
    alert('addingTOfollll')
    const following = [...this.state.following, userId];

    this.setState({
      following: following
    })
  }


  render() {
    const { following } = this.state;

    const panes = [
      { menuItem: 'Friends', render: () => <Tab.Pane><FriendsSection /></Tab.Pane> },
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