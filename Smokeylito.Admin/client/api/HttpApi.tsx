import axios from 'axios';
import { TargetApplication } from '../../models/target-application';

export default new class HttpApi {
    async getAllSmoketestApplications(): Promise<TargetApplication[]> {
        const result = await axios.get('/smoketests');

        return Object.assign(new Array<TargetApplication>(), result.data);
    }
}