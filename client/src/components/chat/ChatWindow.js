import React, {useState} from 'react'
import {Card, Form, TextArea, Button, Comment, Message, Header, Grid, Icon} from 'semantic-ui-react';
import {useSelector, useDispatch} from "react-redux";
import {stopChattingWithFriendAction, sendMessageAction} from "../../actions/chatActions"

const ChatWindow = ({step, friend}) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState();

  const handleSendMessage = () => {
    dispatch(sendMessageAction(friend._id, message))
  };

  return (
    <Card style={{
      position: "fixed",
      bottom: 0,
      right: 300 * step,
    }}>
      <Card.Content children={
        <Header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          {friend && friend.name || "User name"}
          <Button style={{flex: 0, fontSize: 14, padding: 10}} circular icon='close' onClick={() => {
            dispatch(stopChattingWithFriendAction(friend));
          }} />
        </Header>
      }/>

      <Card.Content
        style={{height: 250, overflowY: "scroll"}}>
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
        <Form onSubmit={handleSendMessage}>
          <TextArea  value={message} onChange={(e) => setMessage(e.target.value)} placeholder='write a message'/>
          <Button submit positive fluid >
            Send
          </Button>
        </Form>
      </Card.Content>
    </Card>
  )
}

export default ChatWindow