import React, { Component } from 'react';
import { Grid, Card, Icon, Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AddPostModal from './AddPostModal';

class PostsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [{username:1},{username:2}]
        }
    }

    handleClickAddPost = () => {
        const { user } = this.props;
        const posts = this.state.posts.slice();
        posts.push({username: user.name })
        this.setState({
            posts: posts
        })
    }


    renderPosts = () => {
        const { posts } = this.state;
        const description = 'Amy is a violinist with 2 years experience in the wedding industry.';

        return posts.map(post => {
            return (
                <Grid.Row style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card>
                        <Card.Content header='About Amy' >
                            <Icon name='user' />
                            {post.username}
                    </Card.Content>
                        <Card.Content description={description} />
                        <Card.Content extra>
                            <Icon name='heart' />
                            4
                    </Card.Content>
                    </Card >
                </Grid.Row>
            )
        })

    }

    render() {
        return (
            <>
            <Grid padded centered >
                <Grid.Row>
                    <Grid.Column width="6" >
                        <Button
                            fluid
                            primary
                            style={{ paddingLeft: '30px', paddingRight: '30px' }}
                            onClick={this.handleClickAddPost}
                        >Add Post</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column width="6" >
                        {this.renderPosts()}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <AddPostModal modalOpen={true}/>
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
      user: state.auth.user,
    }
  }
  
  export default connect(mapStateToProps, {})(PostsList);