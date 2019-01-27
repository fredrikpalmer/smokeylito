export class Loader {
    numberOfRequests: number;

    constructor(numberOfRequests?: number) {
        this.numberOfRequests = numberOfRequests || 0;
    }
    on(): void {
        this.numberOfRequests += 1;
    }
    off(): void {
        this.numberOfRequests -= 1;
    }
    get isActive(): boolean {
        return this.numberOfRequests > 0;
    }
}

