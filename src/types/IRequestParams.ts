export type TBaseParams = Record<string, string | number | string[]>;
export interface IRequestParams extends TBaseParams {
	From: number;
	To: number;
	Columns: string[];
	ForecastId: string;
	Interval: number;
}

export interface ILatestAggregatesRequestParams extends Pick<IRequestParams, 'ForecastId' | 'Fields' | 'Interval'> {}

export interface IHistoricalAggregatesRequestParams extends Pick<IRequestParams, 'From' | 'To' | 'Interval'> {}

export interface ICallbacks<T> {
	error?: (error: any) => void;
	success?: (data?: T) => void;
}
