import React, { Component } from 'react'
import { Button, Modal, Checkbox, Form, Message, Grid} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class LoginModal extends Component {
    state = {
        email: '',
        password: ''
    }
    
    handleChange = (e) => this.setState({[e.target.name]: e.target.value}) 
    handleSubmit = () => console.log('submitted') 

    render() {
        const { email, password} = this.state;
        const { handleClose} = this.props;
        return (
            <Modal size='tiny' open={this.props.modalOpen}
                onClose={typeof handleClose === 'function' && handleClose} centered={false}>
                <Modal.Header>Login</Modal.Header>
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
                            <label>Email</label>
                            <input name='email' placeholder='Email' value={email} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input name='password' type='password' placeholder='Password' value={password} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Checkbox label='Remember me' />
                            <Link to='/forgot-password'  className='link'>Forgot your password?</Link> 
                        </Form.Field>
                        <Button color='orange' fluid type='submit'>Submit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default LoginModal;