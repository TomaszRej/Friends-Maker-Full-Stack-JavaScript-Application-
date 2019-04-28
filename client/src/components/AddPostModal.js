import React, { Component } from 'react'
import { Button, Modal, Checkbox, Form, Message, Grid, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';



class AddPostModal extends Component {
    state = {
        email: '',
        message: []
    }
  

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })
    handleSubmit = () => {

    }

    handleClickOnLink = () => {

    }

    renderErrorMessage = () => {
        const { message } = this.state;
        const error = message.length !== 0 &&
            <Grid padded='vertically'>
                <Grid.Row>
                    <Grid.Column>
                        <Message
                            error
                            header='There was some errors with your submission'
                            list={[message]}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        return error;

    }
    renderModalContent = () => {
        const { email, password } = this.state;
        const { isLoading } = this.props;
        const content = isLoading ?
            <Segment style={{ height: '300px' }}>
                <Dimmer active>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
            </Segment> :
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Email</label>
                    <input name='email' placeholder='Email' value={email} onChange={e => this.setState({ email: e.target.value })} />
                </Form.Field>
                <Button color='orange' fluid type='submit'>Reset Password</Button>
            </Form>
        return content
    }
    render() {
        const { forgotPasswordModalOpened } = this.props;

        console.warn(this.props.errors, "errors loginError LOGIN MODAL");
        return (
            <Modal size='tiny' open={forgotPasswordModalOpened}
                centered={false}
                // onClose={closeForgotPasswordModal}
                >
                <Modal.Header>Add Post</Modal.Header>
                <Modal.Content>
                    {this.renderErrorMessage()}
                    {this.renderModalContent()}
                </Modal.Content>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        error: state.loginError,
        isAuthanticated: state.auth.isAuthanticated,
        forgotPasswordModalOpened: state.layout.forgotPasswordModalOpened
    }
}

export default connect(mapStateToProps,{})(AddPostModal);