class TargetApplication{
    name: string;
    baseUrl: string;
    params: string[];
    tests: SmokeTestScenario[]
}

class SmokeTestScenario{
    id: number;
    expected: any;
    actual: any;
}

class SmokeTest{
    id: number;
    name: string;
}






