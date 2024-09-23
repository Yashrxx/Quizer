import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import 'bootstrap/dist/css/bootstrap.min.css';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login attempted with:', { email, password });
    // Here you would typically send a request to your server
  };
  return (
    <Fragment>
      <Helmet><title>Quiz App</title></Helmet>
      <div id="login" >
        <div className="container-x">
        <section >
          <Container>
            <Row style={{justifyContent:"space-evenly",alignItems:"center",alignContent:"center"}}>
              <Col xs={12} md={6}>
                <h2 className="text-center mb-4">Login</h2>
                <Row  onSubmit={handleSubmit}>
                  <Form.Group style={{width:"200%"}} className="justify-content-md-center  mb-3" controlId="formBasicEmail">
                    <Form.Label >Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className=" mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button className="logx mb-3 w-100" variant="primary" type="submit" >
                    Login
                  </Button>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      </div>
    </Fragment>
  );
}
export default Login;
// {/* <div className="container">
// <Container>
// <Row className="justify-content-md-center">
//   <Col xs={12} md={6}>
//     <h2 className="text-center mb-4">Login</h2>
//     <Form onSubmit={handleSubmit}>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit" className="w-100">
//         Login
//       </Button>
//     </Form>
//   </Col>
// </Row>
// </Container>
// </div> */}
