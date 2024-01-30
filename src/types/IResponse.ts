export interface IResponse<T> {
	status?: number;
	errors?: any | null;
	success?: boolean;
    message?: string;
	pageNumber?: number;
	pageSize?: number;
	results: T;
}
