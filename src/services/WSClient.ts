import { HubConnection, IStreamSubscriber, ISubscription } from '@microsoft/signalr';
import BaseWSClient from './BaseWSClient';
import { IForecastAggregate } from '../types';

class WSClient extends BaseWSClient {
	private forecastHub = 'forecastHub';
	constructor(apiKey: string) {
		super(apiKey);
	}

	async streamForecastAggregates(
		forecastId: string,
		identifier: string,
		subscriber: IStreamSubscriber<IForecastAggregate>
	) {
		return await this.streamSignalRChannel(this.forecastHub, 'Aggregates', [forecastId, identifier], subscriber);
	}

	async disconnect(connection: HubConnection) {
		await this.disconnectSignalRConnection(connection);
	}

	unsubscribeStream<T>(subscription: ISubscription<T>) {
		subscription.dispose();
	}
}

export default WSClient;
