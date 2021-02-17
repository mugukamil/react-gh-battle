import "./App.css";
import Popular from "./components/Popular";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Battle from "./components/Battle";
import Results from "./components/Results";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/battle" component={Battle}></Route>
          <Route path="/battle/results/" component={Results}></Route>
          <Route path="/popular" component={Popular}></Route>
          <Route render={() => <p>Not found</p>}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
