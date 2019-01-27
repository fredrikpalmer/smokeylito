import {SmokeTestScenario} from './smoketest-scenario';

export class TargetApplication {
    applicationName: string;
    baseUrl: string;
    queryString?: string;
    smokeTests: SmokeTestScenario[];

    constructor(applicationName?: string, baseUrl?: string, queryString?: string, smokeTests?: SmokeTestScenario[]){
        this.applicationName = applicationName || '';
        this.baseUrl = baseUrl || '';
        this.queryString = queryString;
        this.smokeTests = smokeTests || new Array<SmokeTestScenario>();
    }
}
