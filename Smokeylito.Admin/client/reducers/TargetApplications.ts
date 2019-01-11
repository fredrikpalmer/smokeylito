import { ApplicationState } from '../../shared/application-state';
import { RECEIVE_SMOKETEST_TARGETAPPLICATIONS, REQUEST_SMOKETEST_TARGETAPPLICATIONS } from '../constants';

export function targetApplicationsReducer(state: ApplicationState, action: any): ApplicationState {
    state = state || { targets:[], isFetching: false };

    switch(action.type){
        case RECEIVE_SMOKETEST_TARGETAPPLICATIONS:
            return {
                ...state,
                targets: action.targets,
                isFetching: false
            };
        case REQUEST_SMOKETEST_TARGETAPPLICATIONS:
            return {
                ...state,
                isFetching: true
            };
        default:
            return state;
    }
}

  

