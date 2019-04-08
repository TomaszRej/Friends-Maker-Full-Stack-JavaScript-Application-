import React from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';
import Nav from './Nav';


class ForgotPassword extends React.Component {
    state = {
        email: ''
    }

    render() {
        const { email } = this.state;
        return (
            <Grid padded centered>
                <Grid.Column width="12">
                    <Nav />
                    <Grid padded centered>
                        <Grid.Column width="8">
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <label>Email</label>
                                    <input name='email' placeholder='Email' value={email} onChange={e => this.setState({ email: e.target.value })} />
                                </Form.Field>
                                <Button color='orange' fluid type='submit'>Reset Password</Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>
        )
    }
}

export default ForgotPassword;