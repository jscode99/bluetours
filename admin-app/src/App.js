import { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import EmailInput from './containers/EmailInput'
import {reducer,initialState} from './Reducer/useReducer'

//initializing createContext
export const userContext = createContext();

// Routing varible
const Routing = () => {
  // Initializing useHistory
  const history = useHistory();

  // Initializing useContext hook with userContext
  const { state, dispatch } = useContext(userContext);

  //useEffect hook
  useEffect(() => {
    // Parsing users data from localstorage
    const user = JSON.parse(localStorage.getItem("user"));
    // Checking Dispatch method
    dispatch({ type: "USER", payload: user });
    // Checking & redirecting user
    if (!user) {
      history.push("/signin");
    }
  }, [])
  
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/EmailInput" exact component={EmailInput}/>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <userContext.Provider value={{ state: state, dispatch: dispatch }}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
