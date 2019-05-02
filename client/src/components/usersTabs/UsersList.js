import React from 'react'
import { Icon, List, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions';



class UsersList extends React.Component {
  // constructor(props){
  //   super(props);

  //   this.state = {
  //     users: []
  //   }
  // }
  componentDidUpdate(){
   // getUsers();
  }


  render() {
    return (
      this.props.users.map(user => {
        return (
          <List selection verticalAlign='middle'>
            <List.Item active>
            <Icon name='user' />
              <List.Content>
                <List.Header>{user.name}</List.Header>
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
    users: state.users.users
  }
}


export default connect(mapStateToProps, { getUsers })(UsersList);