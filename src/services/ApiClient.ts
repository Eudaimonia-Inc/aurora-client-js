import { IMarketNewsArticle, IMarketNewsEvent } from './../types/IMarketNews';
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
	IAggregatesPrice,
	IHistoricalAggregatesRequestParams, IMarketNewsRequestParams, IPaginationRequestParams, IMarketSentiment, IMarketSentimentRequestParams
} from '../types';
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

	async getAggregatesPrices(
		params: IPaginationRequestParams,
		callbacks?: ICallbacks<IAggregatesPrice[]>
	): Promise<IAggregatesPrice[]> {
		return await this.fetchClient(`${Endpoints.aggregates}/Prices`, { params, callbacks });
	}

	async getMarketNews(
		params: IMarketNewsRequestParams,
		callbacks?: ICallbacks<IMarketNewsArticle[]>
	): Promise<IMarketNewsArticle[]> {
		return await this.fetchClient(Endpoints.marketNews, { params, callbacks });
	}

	async getMarketEvents(
		params: IMarketNewsRequestParams,
		callbacks?: ICallbacks<IMarketNewsEvent[]>
	): Promise<IMarketNewsEvent[]> {
		return await this.fetchClient(`${Endpoints.marketNews}/Events`, { params, callbacks });
	}

	async getMarketNewsTypes(
		callbacks?: ICallbacks<string[]>
	): Promise<string[]> {
		return await this.fetchClient(`${Endpoints.marketNews}/Types`, { callbacks });
	}

	async getMarketSentiment(
		ticker: string,
		params: IMarketSentimentRequestParams,
		callbacks?: ICallbacks<IMarketSentiment[]>
	): Promise<IMarketSentiment[]> {
		return await this.fetchClient(`${Endpoints.marketSentiment}/${ticker}`, { params, callbacks });
	}
}

export default ApiClient;
