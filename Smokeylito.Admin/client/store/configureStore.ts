import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { targetApplicationsReducer } from '../reducers/targetApplicationsReducer';
import { loaderReducer } from "../reducers/loaderReducer";

declare global{
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION__: any;
    }
}

export default function configureStore() {
  const reducers = {
    targets: targetApplicationsReducer,
    loader: loaderReducer
  }

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
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
