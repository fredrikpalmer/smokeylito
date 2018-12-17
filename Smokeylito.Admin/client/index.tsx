import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './App';
import 'bootstrap';
import './styles/index.less';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { getAllSmoketestApplications } from './reducers/smoketest-reducer';
import {ApplicationState} from '../models/application-state';
import { SmokeTestAction } from './actions/SmokeTestAction';

const store = createStore<ApplicationState, SmokeTestAction, {}, {}>(getAllSmoketestApplications);

ReactDOM.render(
      <Provider store={store}>
        <Hello />
      </Provider>,
    document.getElementById('root') as HTMLElement
  );