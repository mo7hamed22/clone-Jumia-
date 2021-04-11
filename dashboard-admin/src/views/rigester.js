import React, { Component } from 'react';
import { Container, Form } from 'react-bootstrap';

class Rigester extends Component {
  state = {  }
  render() { 
    return (
      <Container>
        <Form>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control type="text" name="userName"/>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

export default Rigester;