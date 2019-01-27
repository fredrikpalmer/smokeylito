import { TargetApplication } from "../../models/target-application";
import { Loader } from "./loader";

export class ApplicationState {
    targets: TargetApplication[];
    loader: Loader;

    constructor() {
        this.targets = new Array<TargetApplication>();
        this.loader = new Loader();
    }
}


