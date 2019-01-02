import { TargetApplication } from "./target-application";

export interface ApplicationState{
    [key: string]: any;
    isFetching: false,
    targets: TargetApplication[];
}