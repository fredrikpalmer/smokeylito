import { ApplicationState } from '../../models/application-state';
import { SmokeTestAction } from '../actions/SmokeTestAction';
import { RECEIVE_SMOKETESTS, REQUEST_SMOKETESTS } from '../constants/smoketest-constants';

export function requestSmokeTests(state: ApplicationState, action: SmokeTestAction): ApplicationState {
    switch(action.type){
        case RECEIVE_SMOKETESTS:
        case REQUEST_SMOKETESTS:
            return Object.assign({}, state, posts(state, action));
        default:
            return state;
    }
}

function posts(state: ApplicationState, action: SmokeTestAction) {
    switch (action.type) {
      case REQUEST_SMOKETESTS:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case RECEIVE_SMOKETESTS:
        return Object.assign({}, state, {
          isFetching: false,
          targets: action.targets,
        });
      default:
        return state
    }
  }
  

