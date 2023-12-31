export interface IForecast {
	id: string;
	name: string;
}

export interface IAggregate {
	Close: number;
	Timestamp: number;
}

export interface IForecastAggregate {
	from: number;
	to: number;
	step: number;
	aggregates: IAggregate[];
}

export interface IForecastAccuracy {
	Close_mae: number;
	Close_rmse: number;
}
