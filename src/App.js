import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CoinData from "./CoinData";
import Home from "./Home";

function App() {
  return (
    <div>
      <Router >
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/home/:id" exact component={CoinData}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;


