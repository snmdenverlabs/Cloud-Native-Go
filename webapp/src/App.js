import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import { About } from './components/About';
import { NoMatch } from './NoMatch';
import Sidebar from './components/Sidebar';

import FeedBackForm from "./components/feedback-form.component";
import FeedbackList from "./components/feedback-table.component";
import Thankyou from './components/Thankyou';

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        
        {
        /*
        <Sidebar />
        */
        }
        <Switch>
          <Route exact path="/" component={FeedBackForm} />
          <Route exact path="/home" component={FeedBackForm} />
          <Route path="/list" component={FeedbackList} />
          <Route path="/thankyou" component={Thankyou} />
          <Route path="/about" component={About} />
          
          <Redirect from='/' to="/thankyou" />
          
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;