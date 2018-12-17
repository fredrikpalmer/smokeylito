import * as constants from '../constants/smoketest-constants';

export interface GetAll {
    type: constants.GETALL_SMOKETEST;
}

export type SmokeTestAction = GetAll;

export function getAllSmoketest(): GetAll {
    return {
        type: constants.GETALL_SMOKETEST
    };
}
