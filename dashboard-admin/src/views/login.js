import React from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import {userActions} from '../_action/user.action'

class LogIn extends React.Component {
  state = {
    userEmail: '',
    password: '',
    show: false,
    required: false
  }
  
  handelKeyUP = (event) => {
    const user = {[event.target.id]:event.target.value}
    this.setState(user)
  }
  handelSubmit = (e) => {
    e.preventDefault()
    this.setState({required:true})
    const { userEmail, password } = this.state
    if (userEmail && password) {
      this.props.login(userEmail, password)
      
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
    }
  }
  render() {
    const { userEmail, password } = this.state;
    return(
      <Container>
        <Form>
          <Alert className='d-none' variant="danger" dismissible>
            This Email is Not Register
          </Alert>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control id="userEmail" name="userEmail" type="email" placeholder="Enter Your Email" onChange={this.handelKeyUP} />
            <Alert className={this.state.required && !userEmail ? 'text-danger' : 'd-none'} >Email Is Required</Alert>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control id="password" name="password" type="password" autoComplete="off" placeholder="Password" onChange={this.handelKeyUP} />
            <Alert className={this.state.required&& !password ?'text-danger':'d-none'} >password Is Required</Alert>
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