import React, { Component } from 'react'
import { Button, Modal, Form, Message, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';


class RegisterModal extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        message: []
    }
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        console.log(error, "ERRORR")

        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            }
        }

        // // If authenticated, close modal
        // if (this.state.modal) {
        //   if (isAuthenticated) {
        //     this.toggle();
        //   }
        // }
    }


    handleClose = () => this.setState({ modalOpen: false });
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const { handleClose, register } = this.props;

        //ES6 syntax
        const newUser = { name, email, password };
        register(newUser);

        // dispatch

        if (typeof handleClose === 'function') {
            handleClose();
        }
    }

    render() {
        const { name, email, password, confirmPassword } = this.state;
        return (
            <Modal size='tiny' open={this.props.modalOpen}
                onClose={this.props.handleClose} centered={false}>


                <Modal.Header>Register</Modal.Header>

                <Modal.Content>
                <Grid padded='vertically'>
                    <Grid.Row>
                        <Grid.Column>
                            <Message
                                error
                                header='There was some errors with your submission'
                                list={[
                                    'You must include both a upper and lower case letters in your password.',
                                    'You need to select your home country.',
                                ]}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                    <Form onSubmit={this.handleSubmit}>
  
                        <Form.Field>
                            <label>Name</label>
                            <input name='name' placeholder='Name' value={name} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input name='email' placeholder='Email' value={email} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input name='password' type='password' placeholder='Password' value={password} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirm password</label>
                            <input name='confirmPassword' type='password' placeholder='Confirm password' value={confirmPassword} onChange={this.handleChange} />
                        </Form.Field>
                        <Button color='orange' fluid type='submit'>Submit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});


export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);