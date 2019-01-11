import * as constants from '../constants';
import { TargetApplication } from '../../shared/target-application';
import { Dispatch } from 'redux';

export interface RequestTargetApplications {
    type: string;
}

export interface ReceiveTargetApplications {
    type: string;
    targets: TargetApplication[];
}

export type SmokeTestAction = RequestTargetApplications | ReceiveTargetApplications;

export const requestTargetApplications = () => async (dispatch: Dispatch<SmokeTestAction>) => {
    dispatch({ type: constants.REQUEST_SMOKETEST_TARGETAPPLICATIONS });

    const targetApplications = new Array<TargetApplication>();
    try {
        const response = await fetch('/targetApplications');
        const targetApplicationsResult = await response.json() as TargetApplication[];    

        targetApplicationsResult.map(target => {
            targetApplications.push(Object.assign(new TargetApplication(), target));
        });
        
    } catch (error) {
        console.log(error);
    }

    dispatch({ type: constants.RECEIVE_SMOKETEST_TARGETAPPLICATIONS, targets: targetApplications });
}

