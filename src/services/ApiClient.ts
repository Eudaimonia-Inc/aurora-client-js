import { Endpoints } from '../constants/endpoints';
import {
	ICallbacks,
	IColumns,
	IForecast,
	IForecastAccuracy,
	IForecastAggregate,
	IIdentifier,
	ILatestAggregatesRequestParams,
	IRequestParams,
} from '../types';
import BaseApiClient from './BaseApiClient';

class ApiClient extends BaseApiClient {
	constructor(apiKey: string) {
		super(apiKey);
	}

	async getIdentifiers(callbacks?: ICallbacks<IIdentifier[]>): Promise<IIdentifier[]> {
		return await this.fetchClient(Endpoints.data.identifiers, { callbacks });
	}

	async getColumns(callbacks?: ICallbacks<IColumns[]>): Promise<IColumns[]> {
		return await this.fetchClient(Endpoints.data.columns, { callbacks });
	}

	async getForecast(Identifier: string, callbacks?: ICallbacks<IForecast[]>): Promise<IForecast[]> {
		return await this.fetchClient(Endpoints.forecast, { queryParams: { Identifier }, callbacks });
	}

	async getForecastAggregates(
		forecastId: string,
		params: IRequestParams,
		callbacks?: ICallbacks<IForecastAggregate[]>
	): Promise<IForecastAggregate[]> {
		return await this.fetchClient(`${Endpoints.forecast}/${forecastId}/aggregates`, {
			queryParams: params,
			callbacks,
		});
	}

	async getLatestForecastAggregates(
		forecastId: string,
		params: ILatestAggregatesRequestParams,
		callbacks?: ICallbacks<IForecastAggregate>
	): Promise<IForecastAggregate> {
		return await this.fetchClient(`${Endpoints.forecast}/${forecastId}/aggregates/latest`, {
			queryParams: params,
			callbacks,
		});
	}

	async getForecastAccuracy(
		forecastId: string,
		Identifier: string,
		callbacks?: ICallbacks<IForecastAccuracy>
	): Promise<IForecastAccuracy> {
		return await this.fetchClient(`${Endpoints.forecast}/${forecastId}/accuracy`, {
			queryParams: { Identifier },
			callbacks,
		});
	}
}


export default ApiClient;
