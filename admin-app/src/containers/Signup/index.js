import React from "react";
import { Layout } from "../../components/Layout";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from "../../components/UI/Input";

function Signup() {
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
                  <Form>
                    <Row>
                      <Col md={6}>
                        {" "}
                        <Input
                          label="First Name"
                          type="text"
                          placeholder="First Name"
                          value=""
                          onChange={() => {}}
                        />
                      </Col>
                      <Col md={6}>
                        {" "}
                        <Input
                          label="Last Name"
                          type="text"
                          placeholder="Last Name"
                          value=""
                          onChange={() => {}}
                        />
                      </Col>
                    </Row>
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Email address"
                      value=""
                      onChange={() => {}}
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="password"
                      value=""
                      onChange={() => {}}
                    />

                    <Button variant="dark" type="submit">
                      Signup
                    </Button>
                  </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Already have an account ? <Link to="signin">Signin</Link>{" "}
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
