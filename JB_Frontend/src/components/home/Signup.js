import React, { Component } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { orderApi } from '../misc/OrderApi'
import { parseJwt, handleLogError } from '../misc/Helpers'

class Signup extends Component {
  static contextType = AuthContext

  state = {
    mobileNumber:'',
    password: '',
    name: '',
    email: '',
    isLoggedIn: false,
    isError: false,
    errorMessage: ''
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

    const { mobileNumber, password, name, email } = this.state
    if (!(mobileNumber && password && name && email)) {
      this.setState({
        isError: true,
        errorMessage: 'Please, inform all fields!'
      })
      return
    }
    const user = { mobileNumber, password, name, email }
    orderApi.register(user)
      .then(response => {
        const { accessToken } = response.data
        //console.log("Json response in sign in"+ JSON.parse(response.data));
        const data = parseJwt(accessToken)
        const user = { data, accessToken }
        const Auth = this.context
        console.log("response "+response.data);
        Auth.userLogin(user)
        this.setState({
          mobileNumber: '',
          password: '',
          isLoggedIn: true,
          isError: false,
          errorMessage: ''
        })
      })
      .catch(error => {
        handleLogError(error)
        if (error.response && error.response.data) {
          const errorData = error.response.data
          let errorMessage = 'Invalid fields'
          if (errorData.status === 409) {
            errorMessage = errorData.message
          } else if (errorData.status === 400) {
            errorMessage = errorData.errors[0].defaultMessage
          }
          this.setState({
            isError: true,
            errorMessage
          })
        }
      })
  }

  render() {
    const { isLoggedIn, isError, errorMessage } = this.state
    if (isLoggedIn) {
      return <Navigate to='/' />
    } else {
      return (
        <Grid textAlign='center'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment>
                <Form.Input
                  fluid
                  autoFocus
                  name='mobileNumber'
                  icon='user'
                  iconPosition='left'
                  placeholder='Mobile Number'
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
                <Form.Input
                  fluid
                  name='name'
                  icon='address card'
                  iconPosition='left'
                  placeholder='Name'
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  name='email'
                  icon='at'
                  iconPosition='left'
                  placeholder='Email'
                  onChange={this.handleInputChange}
                />
                <Button color='violet' fluid size='large'>Signup</Button>
              </Segment>
            </Form>
            <Message>{`Already have an account? `}
              <a href='/login' color='violet' as={NavLink} to="/login">Login</a>
            </Message>
            {isError && <Message negative>{errorMessage}</Message>}
          </Grid.Column>
        </Grid>
      )
    }
  }
}

export default Signup