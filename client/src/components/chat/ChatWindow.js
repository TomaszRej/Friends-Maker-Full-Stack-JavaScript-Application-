import React, {useState} from 'react'
import {Card, Form, TextArea, Button, Comment, Message, Header, Grid, Icon} from 'semantic-ui-react';
import {useSelector, useDispatch} from "react-redux";
import {stopChatingWithFriendAction} from "../../actions/chatActions"

const ChatWindow = ({step, friend}) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState();

  return (
    <Card style={{
      position: "fixed",
      bottom: 0,
      right: 300 * step,
    }}>
      <Card.Content children={
        <Header style={{display: "flex", justifyContent: "space-between"}}>{friend && friend.name || "User name"}

          <Icon name="close" onClick={() => {
            dispatch(stopChatingWithFriendAction(friend));
          }}/>
        </Header>
      }/>

      <Card.Content
        style={{height: 200, overflowY: "scroll"}}>
        <Comment.Group>
          <Comment>
            <Comment.Content>
              <Comment.Text>
                <Message>This has been very useful for my research. Thanks as well!</Message>
              </Comment.Text>
            </Comment.Content>
            <Comment.Group>
              <Comment>
                <Comment.Text><Message>Elliot you are always so right :)</Message></Comment.Text>
              </Comment>
            </Comment.Group>
          </Comment>


          <Comment>
            <Comment.Content>
              <Comment.Text>
                <Message>This has been very useful for my research. Thanks as well!</Message>
              </Comment.Text>
            </Comment.Content>
            <Comment.Group>
              <Comment>
                <Comment.Text><Message>Elliot you are always so right :)</Message></Comment.Text>
              </Comment>
            </Comment.Group>
          </Comment>


        </Comment.Group>

      </Card.Content>
      <Card.Content extra>
        <Form>
          <TextArea  value={message} onChange={(e) => setMessage(e.target.value)} placeholder='write a message'/>
          <Button positive fluid>
            Send
          </Button>
        </Form>
      </Card.Content>
    </Card>
  )
}

export default ChatWindow