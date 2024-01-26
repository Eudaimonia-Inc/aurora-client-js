export type TBaseParams = Record<string, string | number | string[] | boolean>;
export interface IRequestParams extends TBaseParams {
	From: number;
	To: number;
	Columns: string[];
	ForecastId: string;
	Interval: number;
}

export interface ILatestAggregatesRequestParams extends Pick<IRequestParams, 'ForecastId' | 'Fields' | 'Interval'> {}

export interface IHistoricalAggregatesRequestParams extends Pick<IRequestParams, 'From' | 'To' | 'Interval'> {}

export interface IPaginationRequestParams extends TBaseParams {
	pageNumber: number;
	pageSize: number;
	orderBy?: string;
	isDesc?: boolean;
}

export interface IMarketNewsRequestParams extends IPaginationRequestParams {
	filterBy?: string;
	filter?: string;
	type?: string
}

export interface IMarketEventsRequestParams extends IPaginationRequestParams {
	filterBy?: string;
	filter?: string;
	ticker?: string
}

export interface IMarketSentimentRequestParams extends IPaginationRequestParams {
	ticker?: string
}

export interface ICallbacks<T> {
	error?: (error: any) => void;
	success?: (data?: T) => void;
}
