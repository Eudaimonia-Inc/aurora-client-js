export interface IResponse<T> {
	status?: number;
	errors?: any | null;
	success?: boolean;
    message?: string;
	result: T;
}
