import { RECEIVE_SMOKETEST_TARGETAPPLICATIONS, REQUEST_SMOKETEST_TARGETAPPLICATIONS } from '../constants';
import { TargetApplication } from '../../models/target-application';

export function targetApplicationsReducer(state = new Array<TargetApplication>(), action: any): TargetApplication[] {
    switch(action.type){
        case RECEIVE_SMOKETEST_TARGETAPPLICATIONS:            
            return new Array<TargetApplication>(...action.targets);
        case REQUEST_SMOKETEST_TARGETAPPLICATIONS:
            return new Array<TargetApplication>();
        default:
            return state;
    }
}
 

