import React from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import {userActions} from '../_action/user.action'

class LogIn extends React.Component {
  state = {
    userEmail: '',
    password: '',
    show: false,
    requiredEmail: false,
    requiredPassword: false,
    usersList: []
  }
  
  handelKeyUP = (event) => {
    const user = {[event.target.id]:event.target.value}
    this.setState(user)
  }
  handelSubmit = (e) => {
    e.preventDefault()
    if (this.state.userEmail && this.state.password) {
      this.props.login(this.state.userEmail, this.state.password)
      let activeUser = JSON.parse(localStorage.getItem('user'))
      console.log(activeUser);
      const { userEmail, password } = this.state
      
      // axios.post('http://localhost:8080/user/login/',{data:{userEmail,password}})
      // .then((users) => {
      //   this.setState({usersList:users.data})
      //   console.log(this.state.usersList)
      //   if (users.data === "user Not fond") {
      //     this.setState({ show: true });
      //   } else {
      //     this.setState({ show: false });
      //   }
      // })
    }else if (!this.state.userEmail&&!this.state.password) {
      this.setState({requiredEmail:true,requiredPassword:true})
    } else if (!this.state.userEmail) {
      this.setState({requiredEmail:true})
    } else if (!this.state.password) {
      this.setState({requiredPassword:true})
    }
  }
  render() {
    const {loggingIn} = this.props
    return(
      <Container>
        <Form>
          <Alert show={this.state.show} className='text-danger' variant="danger" dismissible>
            This Email is Not Register
          </Alert>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control id="userEmail" name="userEmail" type="email" placeholder="Enter Your Email" onChange={this.handelKeyUP} />
            <Alert show={this.state.requiredEmail} className='text-danger' >Email Is Required</Alert>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control id="password" name="password" type="password" autoComplete="off" placeholder="Password" onChange={this.handelKeyUP} />
            <Alert show={this.state.requiredPassword} className='text-danger' >password Is Required</Alert>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handelSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}
function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}
const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LogIn);
export { connectedLoginPage as LogIn };