import * as constants from '../constants';
import { TargetApplication } from '../../models/target-application';
import { Dispatch, AnyAction } from 'redux';
import { loaderOn, loaderOff } from './loaderActions';

export interface RequestTargetApplications {
    type: string;
}

const requestTargetApplications = (): RequestTargetApplications => {
    return {
        type: constants.REQUEST_SMOKETEST_TARGETAPPLICATIONS
    };
}

export interface ReceiveTargetApplications {
    type: string;
    targets: TargetApplication[];
}

const receiveTargetApplications = (targets: TargetApplication[]): ReceiveTargetApplications => {
    return {
        type: constants.RECEIVE_SMOKETEST_TARGETAPPLICATIONS,
        targets: targets
    };
}

export type TargetApplicationsAction = RequestTargetApplications | ReceiveTargetApplications;

export const getTargetApplications = () => async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loaderOn());
    dispatch(requestTargetApplications());

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

    dispatch(receiveTargetApplications(targetApplications));
    dispatch(loaderOff());
}

