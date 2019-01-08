import { TargetApplication } from '../../models/target-application';

export default new class HttpApi {
    async getAllSmoketestApplications(): Promise<TargetApplication[]> {
        const result = await fetch('/smoketests');

        return Object.assign(new Array<TargetApplication>(), await result.json());
    }
}