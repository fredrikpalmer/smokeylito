import * as Promise from 'bluebird';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './App';
import 'bootstrap';
import './styles/index.less';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { requestSmokeTests } from './reducers/smoketest-reducer';
import {ApplicationState} from '../models/application-state';
import { SmokeTestAction } from './actions/SmokeTestAction';

const store = createStore<ApplicationState, SmokeTestAction, {}, {}>(requestSmokeTests);

ReactDOM.render(
      <Provider store={store}>
        <Hello dispatch={store.dispatch} />
      </Provider>,
    document.getElementById('root') as HTMLElement
  );