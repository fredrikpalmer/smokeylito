import * as constants from '../constants';

export interface ILoader {
    type: string;
}

export const loaderOn = (): ILoader => {
    return {
        type: constants.LOADER_ON
    };
}

export const loaderOff = (): ILoader => {
    return {
        type: constants.LOADER_OFF
    };
}