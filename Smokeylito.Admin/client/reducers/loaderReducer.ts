import { LOADER_ON, LOADER_OFF } from '../constants';
import { Loader } from "../models/loader";

export function loaderReducer(state = new Loader(), action: any): Loader {
    switch (action.type) {
        case LOADER_ON:
            return new Loader(state.numberOfRequests + 1);
        case LOADER_OFF:
            return new Loader(state.numberOfRequests - 1);
        default:
            return state;
    }
}
