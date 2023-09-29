import { Endpoints } from '../constants/endpoints';
import {
	ICallbacks,
	IColumn,
	ICryptoAggregate,
	IForecast,
	IForecastAccuracy,
	IForecastAggregate,
	IIdentifier,
	ILatestAggregatesRequestParams,
	IRequestParams,
} from '../types';
import { IHistoricalAggregatesRequestParams } from '../types/IRequestParams';
import BaseApiClient from './BaseApiClient';

class ApiClient extends BaseApiClient {
	constructor(apiKey: string) {
		super(apiKey);
	}

	async getIdentifiers(callbacks?: ICallbacks<IIdentifier[]>): Promise<IIdentifier[]> {
		return await this.fetchClient(`${Endpoints.reference}/Tickers`, { callbacks });
	}

	async getColumns(identifier: string, callbacks?: ICallbacks<IColumn[]>): Promise<IColumn[]> {
		return await this.fetchClient(`${Endpoints.forecast}/${identifier}`, { callbacks });
	}

	async getForecast(identifier: string, callbacks?: ICallbacks<IForecast[]>): Promise<IForecast[]> {
		return await this.fetchClient(`${Endpoints.forecast}/${identifier}`, { callbacks });
	}

	async getForecastAggregates(
		identifier: string,
		params: IRequestParams,
		callbacks?: ICallbacks<IForecastAggregate[]>
	): Promise<IForecastAggregate[]> {
		return await this.fetchClient(`${Endpoints.forecast}/${identifier}/Aggregates`, {
			params,
			callbacks,
		});
	}

	async getLatestForecastAggregates(
		identifier: string,
		params: ILatestAggregatesRequestParams,
		callbacks?: ICallbacks<IForecastAggregate>
	): Promise<IForecastAggregate> {
		return await this.fetchClient(`${Endpoints.forecast}/${identifier}/Aggregates/Latest`, {
			params,
			callbacks,
		});
	}

	async getForecastAccuracy(
		identifier: string,
		ForecastId: string,
		callbacks?: ICallbacks<IForecastAccuracy>
	): Promise<IForecastAccuracy> {
		return await this.fetchClient(`${Endpoints.forecast}/${identifier}/Accuracy`, {
			params: { ForecastId },
			callbacks,
		});
	}

	async getHistoricalAggregates(
		identifier: string,
		params: IHistoricalAggregatesRequestParams,
		callbacks?: ICallbacks<ICryptoAggregate[]>
	): Promise<ICryptoAggregate[]> {
		return await this.fetchClient(`${Endpoints.historical}/${identifier}/Aggregates`, { params, callbacks });
	}
}

export default ApiClient;
