import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Mafia from "./Components/Mafia";
import Game from "./Components/Game";
import ErrorPage from "./Components/404";
import Spy from "./Components/Spy";
import Preloader from "./Components/Preloader";
function App() {
    if(window.location.href !== window.location.origin + "/" && window.location.href !== window.location.origin + "/error" && window.location.href !== window.location.origin + "/game"){
        window.location.href = window.location.origin + "/error";
    }
  return (
      <Router>
        <div className="App">
            <Preloader />
            <Route path="/" exact component={Mafia} />
            <Route path="/game" exact component={Game} />
            <Route path="/error" exact component={ErrorPage} />
            <Route path="/spy" exact component={Spy} />
        </div>
      </Router>

  );
}

export default App;
