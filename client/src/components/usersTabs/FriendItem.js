import {Grid, Icon, List, Label} from "semantic-ui-react";
import React from "react";


const FriendItem = props => {
  return (
    <List selection verticalAlign='middle' onClick={props.onClick}>
      <List.Item active={false}>
        <List.Content>
          <Grid verticalAlign='middle' style={{display: 'flex', justifyContent: "space-between"}}>
            <Grid.Column width='12' style={{display: 'flex', flexDirection: 'row'}}>
              <Icon name='user'/>
              <List.Header>{props.friend.name}</List.Header>
            </Grid.Column>
            <Grid.Column width='4'>
              <Label color="green" circular>
                2
              </Label>
            </Grid.Column>
          </Grid>
        </List.Content>
      </List.Item>
    </List>
  )
}

export default FriendItem;

