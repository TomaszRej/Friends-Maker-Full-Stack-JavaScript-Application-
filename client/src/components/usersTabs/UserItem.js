import React from 'react';
import {List, Grid, Icon, Popup, Button} from 'semantic-ui-react';


const UserItem = props => {
  console.log(props, 'props')


  return (
    <List selection verticalAlign='middle'>
      <List.Item active={false} >
        <List.Content >
          <Grid verticalAlign='middle'>
            <Grid.Column width='12' style={{ display: 'flex', flexDirection: 'row' }}>
              <Icon name='user' />
              <List.Header>{props.user.name}</List.Header>
            </Grid.Column>
            <Grid.Column width='4' >
              {props.ifFollowing ?
                <Button circular positive icon='check'  />
                :
                <Popup trigger={<Button circular icon='add' onClick={ () => props.handleAddFriendClick(props.user)} />} content='Send the invitation' />
              }
            </Grid.Column>
          </Grid>

        </List.Content>
      </List.Item>
    </List>
  )
}

export default UserItem;
