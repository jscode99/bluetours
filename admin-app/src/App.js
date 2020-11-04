import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
