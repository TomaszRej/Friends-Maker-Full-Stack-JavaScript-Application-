import React from 'react'
import { Icon, List, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions';


class UsersList extends React.Component {
  render() {


    return (
      <div>You don't have any friends yet</div>
      // <List selection verticalAlign='middle'>
      //   <List.Item active>
      //   <Icon name='user' />
      //     <List.Content>
      //       <List.Header>{user.name}</List.Header>
      //     </List.Content>
      //   </List.Item>
      // </List>
    )


  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users
  }
}


export default connect(mapStateToProps, { getUsers })(UsersList);