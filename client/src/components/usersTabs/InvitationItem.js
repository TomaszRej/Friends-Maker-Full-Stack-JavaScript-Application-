import React from 'react';
import {Button, Grid, Header, Icon, List} from "semantic-ui-react";

const InvitationItem = props => {
  return(
    <List selection verticalAlign='middle'>
      <List.Item active={false}>
        <List.Content>
          <Grid verticalAlign='middle'>
            <Grid.Column width='8'
                         style={{
                           display: 'flex',
                           flexDirection: 'row',
                         }}>
              <Icon name='user'/>
              <List.Header>{props.user.name}</List.Header>
            </Grid.Column>
            <Grid.Column>
              <Button circular size="tiny" positive
                      onClick={() => props.handleAddFriendClick(props.user)}>
                <Header style={{color:'white'}}> Confirm </Header>
              </Button>
            </Grid.Column>
          </Grid>
        </List.Content>
      </List.Item>
    </List>
  )
}

export default InvitationItem;