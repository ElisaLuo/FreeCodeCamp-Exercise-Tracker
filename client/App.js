import React from 'react';
import axios from 'axios';
import AddUser from './components/AddUser';
import ExerciseList from './components/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={AddUser} />
          <Route path={"/user/:username"} component={ExerciseList} />
          <Route path={"/:exerciseId"} component={ExerciseDetail} />
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
