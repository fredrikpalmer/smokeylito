import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { targetApplicationsReducer } from '../reducers/GetTargetApplications';
import thunk from 'redux-thunk';

declare global{
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION__: any;
    }
}

export default function configureStore(initialState: any) {
  const reducers = {
    smokeTest: targetApplicationsReducer
  };

  const middleware = [
    thunk,
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const rootReducer = combineReducers({
    ...reducers,
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
