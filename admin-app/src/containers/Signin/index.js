import React,{useState,useContext} from "react";
import { Layout } from "../../components/Layout";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link,useHistory } from 'react-router-dom'
import Input from "../../components/UI/Input";
import M from "materialize-css";
import { userContext } from '../../App'
import axios from 'axios'
import { GoogleLogin } from "react-google-login";

function Signin() {
//initializing useContext hook with userContext 
  const { state, dispatch } = useContext(userContext);

  // useHistory initialization
  let history = useHistory();

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

  //goole
  // const googleAuth = () => {
  //   axios.get("/api/admin/google").then(res => {
      
  //     console.log(res.data);
  //   })
  // }
 //google sucess
  const responseSuccessGoogle = (res) => {
    console.log(res);
    axios({
      method: "POST",
      url: "http://localhost:4000/api/admin/googleLogin",
      headers: { "Content-Type": "application/json" },
      data: { tokenId: res.tokenId },
    })
      .then(response => {
        response.json()
      }).then(data => {
        console.log("Logged in", data);
        
      })
      .catch(err => {
        console.log(err);
      });
  }
  // google error
  const responseErrorGoogle = (res)=>{
    console.log(res);
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
      // To json object
      .then(res => res.json())
      // Data
      .then(data => {
        console.log(data);
                                                                                                                                                                                                                                                                                                                                                                 // Json error object from backend 
        if (data.error) {
         return M.toast({
            html: data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          // Saving token to localStorage of user
          localStorage.setItem("jwt", data.token)
          // Saving user details to localstorage
          localStorage.setItem("user", JSON.stringify(data.user))
          // Dispatch method of useContext
          dispatch({ type: "USER", payload: data.user })
          // Toast message of success
          M.toast({
            html: "SignIn Successfully",
            classes: "#388e3c green darken-2",
          });
          history.push("/")
        }
      })
    // Catch error
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
                    <GoogleLogin
                      clientId="670209693410-jephrvr7n8fp27m39ahao38n14jm1aeu.apps.googleusercontent.com"
                      buttonText="Login with google"
                      onSuccess={responseSuccessGoogle}
                      onFailure={responseErrorGoogle}
                      cookiePolicy={"single_host_origin"}
                    />
                  </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Create an account ? <Link to="signup">Signup</Link>{" "}
                </Card.Footer>
                <Card.Footer className="text-muted">
                  Forgot password ? <Link to="EmailInput">Click here</Link>{" "}
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
