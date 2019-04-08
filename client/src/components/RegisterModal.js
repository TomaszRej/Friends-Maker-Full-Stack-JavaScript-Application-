import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

class RegisterModal extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    handleClose = () => this.setState({ modalOpen: false });
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })
    handleSubmit = () => {
        const { handleClose } = this.props;
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

export default RegisterModal;