import React, {useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Mainpage from './components/mainpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tablepage from './components/tablepage';
import ReactGa from 'react-ga'
function App() {
  useEffect(()=>{
    ReactGa.initialize('UA-198450038-1')
    ReactGa.pageview('/')
  },[])
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Mainpage}/>
        </Switch>
    </Router>
  );
}

export default App;
