import React from "react";
import { Layout } from "../../components/Layout";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Input from "../../components/UI/Input";

function Signin() {
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
                  <Form>
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
