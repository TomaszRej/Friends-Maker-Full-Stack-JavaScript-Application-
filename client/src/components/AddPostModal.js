import React, { Component } from 'react'
import { Button, Modal, Checkbox, TextArea, Form, Message, Grid, Segment, Dimmer, Loader, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { closeAddPostModal } from '../actions/layoutActions';
import { addPost, addToPosts } from '../actions/postActions';


class AddPostModal extends Component {
    state = {
        title: '',
        description: '',
        message: []
    }




    // handleChange = (e) => this.setState({ [e.target.name]: e.target.value })
    handleSubmit = () => {
        const { title, description } = this.state;
        const { closeAddPostModal, addPost } = this.props;
        addPost({ title, description });
        closeAddPostModal();
    }



    // renderErrorMessage = () => {
    //     const { message } = this.state;
    //     const error = message.length !== 0 &&
    //         <Grid padded='vertically'>
    //             <Grid.Row>
    //                 <Grid.Column>
    //                     <Message
    //                         error
    //                         header='There was some errors with your submission'
    //                         list={[message]}
    //                     />
    //                 </Grid.Column>
    //             </Grid.Row>
    //         </Grid>

    //     return error;
    // }


    renderModalContent = () => {
        const { title, description } = this.state;
        return <Form onSubmit={this.handleSubmit}>
            <Form.Field>
                <label>Title</label>
                <Input name='title' placeholder='title' value={title} onChange={e => this.setState({ title: e.target.value })} />
            </Form.Field>
            <Form.Field>
                <label>Description</label>
                <TextArea name='description' rows={3} placeholder='description' value={description} onChange={e => this.setState({ description: e.target.value })} />
                {/* <Input name='title' placeholder='title' value={title} onChange={e => this.setState({ title: e.target.value })} /> */}
            </Form.Field>
            <Button color='orange' fluid onClick={this.handleSubmit}>Add</Button>
        </Form>
    }
    render() {
        const { addPostModalOpened, closeAddPostModal } = this.props;

        return (
            <Modal size='tiny'
                open={addPostModalOpened}
                centered={false}
                onClose={closeAddPostModal}
            >
                <Modal.Header>Add Post</Modal.Header>
                <Modal.Content>
                    {/* {this.renderErrorMessage()} */}
                    {this.renderModalContent()}
                </Modal.Content>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        // isLoading: state.auth.isLoading,
        error: state.loginError,
        isAuthanticated: state.auth.isAuthanticated,
        addPostModalOpened: state.layout.addPostModalOpened,
        //forgotPasswordModalOpened: state.layout.forgotPasswordModalOpened

        posts: state.posts.posts
    }
}

export default connect(mapStateToProps, { closeAddPostModal, addPost, addToPosts })(AddPostModal);