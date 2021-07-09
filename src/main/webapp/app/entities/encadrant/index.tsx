import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Encadrant from './encadrant';
import EncadrantDetail from './encadrant-detail';
import EncadrantUpdate from './encadrant-update';
import EncadrantDeleteDialog from './encadrant-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EncadrantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EncadrantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EncadrantDetail} />
      <ErrorBoundaryRoute path={match.url} component={Encadrant} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EncadrantDeleteDialog} />
  </>
);

export default Routes;
