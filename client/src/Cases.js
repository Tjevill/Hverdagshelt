// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { caseService } from './services';
import { Alert } from './widgets';

export default class Cases extends Component {
  cases = [];

  render() {
    return (
      <ul>
        {this.cases.map(caseslist => (
          <li key={caseslist.id}>
              {caseslist.description}
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    caseService
      .getCases()
      .then(cases => (this.cases = cases))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
