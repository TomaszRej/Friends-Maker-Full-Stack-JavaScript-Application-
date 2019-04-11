import React from 'react';
import { Grid, Form, Button, Message, Segment} from 'semantic-ui-react';
import Nav from '../Nav';


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
                        <Segment padded='very'>
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
                                    <input name='email' placeholder='Email' value={email} onChange={e => this.setState({ email: e.target.value })} />
                                </Form.Field>
                                <Button color='orange' fluid type='submit'>Reset Password</Button>
                            </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>

        )
    }
}

export default ForgotPassword;