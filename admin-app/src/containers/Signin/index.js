import React,{useState} from "react";
import { Layout } from "../../components/Layout";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Input from "../../components/UI/Input";
import M from "materialize-css";

function Signin() {
  // useHistory initialization
  // let history = useHistory();

  // state initialization
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  // destructuring formdata
  const { email, password } = formdata;

  // Event handlers
  const changeHandler = e => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  // Submit Handler
  const submitHandler = e => {
    e.preventDefault();
    console.log(formdata);

    // Backend API call
    fetch("/api/admin/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
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
            html: "SignedIn Successfully",
            classes: "#388e3c green darken-2",
          });
        }
      });
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
                style={{ marginTop: "125px" }}
              >
                <Card.Header style={{ fontWeight: "bolder" }}>
                  Welcome to Blue tours{" "}
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={submitHandler}>
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
                      Signin
                    </Button>
                  </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Create an account ? <Link to="signup">Signup</Link>{" "}
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}

export default Signin;
