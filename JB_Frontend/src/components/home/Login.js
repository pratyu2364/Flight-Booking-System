import React, { Component } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { orderApi } from '../misc/OrderApi'
import { parseJwt, handleLogError } from '../misc/Helpers'

class Login extends Component {
  static contextType = AuthContext

  state = {
    email: '',
    password: '',
    isLoggedIn: false,
    isError: false
  }

  componentDidMount() {
    const Auth = this.context
    const isLoggedIn = Auth.userIsAuthenticated()
    this.setState({ isLoggedIn })
  }

  handleInputChange = (e, {name, value}) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state
    if (!(email && password)) {
      this.setState({ isError: true })
      return
    }
    orderApi.authenticate(email, password)
      .then(response => {
        console.log("Json response in login");
        const { accessToken } = response.data
        console.log(accessToken);
        const data = parseJwt(accessToken)
        const user = { data, accessToken }

        const Auth = this.context
        Auth.userLogin(user)
        this.setState({
          email: '',
          password: '',
          isLoggedIn: true,
          isError: false
        })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ isError: true })
      })
  }

  render() {
    const { isLoggedIn, isError } = this.state
    if (isLoggedIn) {
      return <Navigate to={'/'} />
    } else {
      return (
        <Grid textAlign='center'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment>
                <Form.Input
                  fluid
                  autoFocus
                  name='email'
                  icon='user'
                  iconPosition='left'
                  placeholder='Email'
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleInputChange}
                />
                <Button color='violet' fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>{`Don't have already an account? `}
              <a href='/signup' color='violet' as={NavLink} to="/signup">Sign Up</a>
            </Message>
            {isError && <Message negative>The email or password provided are incorrect!</Message>}
          </Grid.Column>
        </Grid>
      )
    }
  }
}

export default Login