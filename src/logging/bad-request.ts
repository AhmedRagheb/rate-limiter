export class InvalidParamater extends Error {
    constructor(message?: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}
