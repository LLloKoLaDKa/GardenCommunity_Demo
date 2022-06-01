import { ErrorData } from './errorData';

export class Result<T> {
    public isSuccess = this.errors.length === 0;

    constructor(
        public data: T | null,
        public errors: ErrorData[],
    ){}

    public static success<T>(value: T): Result<T> {
        return new Result<T>(value, []);
    }

    public static fail(errors: ErrorData[]): Result<null> {
        return new Result(null, errors);
    }
    
    public getErrorsString = (): string => {
    	return this.errors.map(error => error.message).join('. ')
	}
}

export const mapToResult = (value: any) => {
    return new Result(value.data, value.errors ?? []);
}

