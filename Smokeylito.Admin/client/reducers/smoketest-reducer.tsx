import { ApplicationState } from '../../models/application-state';
import { SmokeTestAction } from '../actions/SmokeTestAction';

export function getAllSmoketestApplications(state: ApplicationState, action: SmokeTestAction): ApplicationState {
    return { ...state, targets: []};
}