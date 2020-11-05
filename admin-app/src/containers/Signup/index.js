import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link,useHistory } from "react-router-dom";
import Input from "../../components/UI/Input";
import M from 'materialize-css'

function Signup() {
  
  // useHistory initialization
  let history = useHistory();

  // state initialization
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  //Destructuring formdata
  const { firstname, lastname, email, password } = formdata;

  //Event Handlers
  const changeHandler = e => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  //submit handler
  const submitHandler = e => {
    e.preventDefault();
    console.log(formdata);

    // Backend API call

    fetch("/api/admin/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
      })
    })
      // Data to json object
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          M.toast({
            html: data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          M.toast({
            html: data.success,
            classes: "#388e3c green darken-2",
          });
          //redirecting to signin route
            history.push("/signin");
        }
    
      })
    //catch error to console
      .catch(err => {
      console.log(err);
    })
  };

  return (
    <div>
      <Layout>
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Card
                bg="light"
                className="text-center"
                style={{ marginTop: "80px" }}
              >
                <Card.Header style={{ fontWeight: "bolder" }}>
                  New to Blue tours ?{" "}
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={submitHandler} >
                    <Row>
                      <Col md={6}>
                        {" "}
                        <Input
                          label="First Name"
                          type="text"
                          placeholder="First Name"
                          name="firstname"
                          value={firstname}
                          onChange={changeHandler}
                        />
                      </Col>
                      <Col md={6}>
                        {" "}
                        <Input
                          label="Last Name"
                          type="text"
                          placeholder="Last Name"
                          name="lastname"
                          value={lastname}
                          onChange={changeHandler}
                        />
                      </Col>
                    </Row>
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Email address"
                      name="email"
                      value={email}
                      onChange={changeHandler}
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="password"
                      name="password"
                      value={password}
                      onChange={changeHandler}
                    />

                    <Button variant="dark" type="submit">
                      Signup
                    </Button>
                  </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Already have an account ? <Link to="/signin">Signin</Link>{" "}
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}

export default Signup;
