import { ErrorData } from "./errorData";

export class DataResult<T> {
    public isSuccess = this.errors.length === 0;

    constructor(
        public data: T | null,
        public errors: ErrorData[]
    ){}
}