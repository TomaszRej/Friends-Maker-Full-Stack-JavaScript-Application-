import {Grid, Icon, List} from "semantic-ui-react";
import React from "react";


const FriendItem = props => {
  return (
    <List selection verticalAlign='middle'>
      <List.Item active={false}>
        <List.Content>
          <Grid verticalAlign='middle'>
            <Grid.Column width='12' style={{display: 'flex', flexDirection: 'row'}}>
              <Icon name='user'/>
              <List.Header>{props.friend.name}</List.Header>
            </Grid.Column>
          </Grid>
        </List.Content>
      </List.Item>
    </List>
  )
}

export default FriendItem;

