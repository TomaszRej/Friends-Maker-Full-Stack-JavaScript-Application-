import React, {useEffect} from 'react';
import {Grid, Card, Icon, Button, Modal, Segment, Dimmer, Loader, List} from 'semantic-ui-react';
import {connect} from 'react-redux';
import AddPostModal from './AddPostModal';
import {openAddPostModal} from '../actions/layoutActions';
import {addToPosts} from '../actions/postActions';
import openSocket from 'socket.io-client';


const PostsList = (props) => {
  useEffect(() => {
    const {addToPosts} = props;

    const socket = openSocket('http://localhost:8000');
    socket.on('posts', data => {
      if (data.action === 'create') {
        addToPosts({data});
      }
    });
  }, []);

  const handleClickAddPost = () => {
    const {openAddPostModal} = props;
    openAddPostModal();
  };

  const renderPostContent = (title, description) => {
    return (
    <div>
      <List selection verticalAlign='middle'>
        <List.Item>
          {/* <Image avatar src='/images/avatar/small/helen.jpg' /> */}
          <List.Content>
            <List.Header>{title}</List.Header>
            <p>{description}</p>
          </List.Content>
        </List.Item>
      </List>
    </div>
    )
  };

  const renderPosts = () => {
    const {currUser, posts, postsLoading} = props;

    if (postsLoading) {
      return <Segment style={{height: '300px'}}>
        <Dimmer active>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
      </Segment>
    }

    return  posts.filter(post => {
      if (post.author === currUser._id) {
        return post
      }
      if (currUser.following.find(u => u === post.author)) {
        return post
      }
    }).map((post) => {

      return (
        <Grid.Row key={post.id}
                  style={{marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Card>
            <Card.Content header={post.title}>
              <Icon name='user'/>
              {post.authorName}

            </Card.Content>
            <Card.Content>
              {renderPostContent(post.title, post.description)}
            </Card.Content>
            <Card.Content extra>
              <Icon name='heart'/>
              {post.likes}
            </Card.Content>
          </Card>
        </Grid.Row>
      )
    })



  };


    return (
      <>
        <Grid padded centered>
          <Grid.Row>
            <Grid.Column width="6">
              <Button
                fluid
                primary
                style={{paddingLeft: '30px', paddingRight: '30px'}}
                onClick={handleClickAddPost}
              >Add Post</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="6">
              {renderPosts()}
            </Grid.Column>


          </Grid.Row>
        </Grid>

        <AddPostModal/>
      </>
    )

}


const mapStateToProps = state => {
  return {
    currUser: state.auth.user,
    posts: state.posts.posts,
    postsLoading: state.posts.postsLoading
  }
}

export default connect(mapStateToProps, {openAddPostModal, addToPosts})(PostsList);