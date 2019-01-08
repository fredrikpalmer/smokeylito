import 'bootstrap';
import './styles/index.less';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore({ 
  smokeTest: {
    targets: [],
    isFetching: false,
  }
 });

ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
    document.getElementById('root') as HTMLElement
  );