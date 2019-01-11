import {SmokeTestScenario} from './smoketest-scenario';

export class TargetApplication {
    name: string;
    baseUrl: string;
    params: Map<string, string>;
    tests: SmokeTestScenario[];
}
