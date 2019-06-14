import React from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import ExerciseList from './components/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={UserList} />
          <Route path={"/user/:username"} component={ExerciseList} />
          <Route path={"/:exerciseId"} component={ExerciseDetail} />
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
