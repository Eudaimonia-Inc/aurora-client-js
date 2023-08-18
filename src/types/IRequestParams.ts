export type TBaseParams = Record<string, string | number | string[]>;
export interface IRequestParams extends TBaseParams {
	Identifier: string;
	StartDate?: string;
	EndDate?: string;
	Fields?: string[];
}

export interface ILatestAggregatesRequestParams extends Pick<IRequestParams, 'Identifier' | 'Fields'> {}

export interface ICallbacks<T> {
	error?: (error: any) => void;
	success?: (data?: T) => void;
}
