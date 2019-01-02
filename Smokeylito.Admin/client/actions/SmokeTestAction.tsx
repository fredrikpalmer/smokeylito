import * as constants from '../constants/smoketest-constants';
import { TargetApplication } from '../../models/target-application';
import HttpApi from '../api/HttpApi';
import { Dispatch } from 'redux';

export interface RequestSmokeTests {
    type: constants.REQUEST_SMOKETESTS;
}

export interface ReceiveSmokeTests {
    type: constants.RECEIVE_SMOKETESTS;
    targets: TargetApplication[];
}

export type SmokeTestAction = RequestSmokeTests | ReceiveSmokeTests;

export function requestSmokeTests(): RequestSmokeTests {
    return {
        type: constants.REQUEST_SMOKETESTS,
    };
}

export function receiveSmokeTests(targets: TargetApplication[]): ReceiveSmokeTests {
    return {
        type: constants.RECEIVE_SMOKETESTS,
        targets: targets
    };
}

export function fetchSmokeTests(){
    return (dispatch: Dispatch) => {
      dispatch(requestSmokeTests())
      HttpApi.getAllSmoketestApplications()
        .then(targets => dispatch(receiveSmokeTests(targets)));
    }
  }