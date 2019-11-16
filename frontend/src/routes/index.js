import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';

import Help from '../pages/Help';
import Plan from '../pages/Plan';
import PlanForm from '../pages/Plan/Form';
import Registration from '../pages/Registration';
import RegistrationForm from '../pages/Registration/Form';
import Student from '../pages/Student';
import StudentForm from '../pages/Student/Form';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/student" exact component={Student} isPrivate />
      <Route path="/student/create" exact component={StudentForm} isPrivate />
      <Route path="/student/edit/:id" exact component={StudentForm} isPrivate />

      <Route path="/registration" exact component={Registration} isPrivate />
      <Route
        path="/registration/create"
        exact
        component={RegistrationForm}
        isPrivate
      />
      <Route
        path="/registration/edit/:id"
        exact
        component={RegistrationForm}
        isPrivate
      />

      <Route path="/plan" exact component={Plan} isPrivate />
      <Route path="/plan/create" exact component={PlanForm} isPrivate />
      <Route path="/plan/edit/:id" exact component={PlanForm} isPrivate />

      <Route path="/help" component={Help} isPrivate />
    </Switch>
  );
}
