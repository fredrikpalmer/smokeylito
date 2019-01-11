import { TargetApplication } from "./target-application";

export interface ApplicationState{
    [key: string]: any;
    targets: TargetApplication[];
    isFetching: boolean,
}