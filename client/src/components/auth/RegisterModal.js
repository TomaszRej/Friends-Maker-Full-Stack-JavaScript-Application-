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
        isRegister: false,
        message: []
    }

    componentDidUpdate(prevProps) {
        const { error, handleOpenLoginModal, handleCloseRegisterModal, isAuthenticated } = this.props;

        console.log(error, prevProps.error ,"porownaine z poprzednim")
        if (error !== prevProps.error) {
            // Check for register error

            let messages = [];
            let errors = error.message.response.data.message;
            if (typeof errors === 'object') {
                for (const el in errors) {
                    messages.push(errors[el]);
                }
            }

            if (typeof errors === 'string') {
                messages.push(errors);
            }

            if (error.id === 'REGISTER_FAIL') {
                //this.setState({ message: messages }, () => console.log(this.state.message, 'state.mesage'));
                this.setState({ message: messages }, () => console.log(this.state.message, 'state.mesage'));
            } else {
                this.setState({ message: null });

            }
        }

        // clearErrors();
        // // If authenticated, close modal
        // if (this.state.modal) {
        //   if (isAuthenticated) {
        //     this.toggle();
        //   }
        // }
        if (isAuthenticated === true) {
            console.log(typeof handleOpenLoginModal, typeof handleCloseRegisterModal);
            
            if (typeof handleOpenLoginModal === 'function' && typeof handleCloseRegisterModal === 'function') {
                handleOpenLoginModal();
                handleCloseRegisterModal()
            }
        }

    }


    handleClose = () => this.setState({ modalOpen: false });
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword  } = this.state;
        const { register, handleOpenLoginModal, handleCloseRegisterModal, isAuthenticated } = this.props;

        //ES6 syntax
        const newUser = { name, email, password, confirmPassword };
        register(newUser);
        console.warn(this.state.message.length, "length");
        
        if (isAuthenticated === true) {
            console.log(typeof handleOpenLoginModal, typeof handleCloseRegisterModal);
            
            if (typeof handleOpenLoginModal === 'function' && typeof handleCloseRegisterModal === 'function') {
                handleOpenLoginModal();
                handleCloseRegisterModal()
            }
        }

  


    }
    renderErrorMessage = () => {
        const { message } = this.state;
        const errors = message.length !== 0 &&
            <Grid padded='vertically'>
                <Grid.Row>
                    <Grid.Column>
                        <Message
                            error
                            header='There was some errors with your submission'
                            list={message}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        return errors
    }


    render() {
        const { name, email, password, confirmPassword } = this.state;
        return (
            <Modal size='tiny' open={this.props.modalOpen}
                onClose={this.props.handleClose} centered={false}>
                <Modal.Header>Register</Modal.Header>
                <Modal.Content>
                    {this.renderErrorMessage()}
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