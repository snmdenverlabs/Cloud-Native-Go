import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import { Home } from './Home';
import { About } from './About';
import { NoMatch } from './NoMatch';
import Sidebar from './components/Sidebar';

import FeedBackForm from "./components/feedback-form.component";
import FeedbackList from "./components/feedback-table.component";

function App() {
  {/*return (<Router>
    <div className="App">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand">Guru Churcha Feedback Form</a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={"/create"}>Feedback Form</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/list"}>Feedback List</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Switch>
              <Route exact path='/' component={CreateFeedback} />
              <Route path="/create" component={CreateFeedback} />
              <Route path="/list" component={FeedbackList} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </Router>
  );
  */}

  return (
    <React.Fragment>
      <Router>
        <NavigationBar />

        <Sidebar />

        <Switch>
          <Route exact path="/" component={FeedBackForm} />
          <Route path="/create" component={FeedBackForm} />
          <Route path="/list" component={FeedbackList} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;