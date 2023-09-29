import { HubConnection, IStreamSubscriber, ISubscription } from '@microsoft/signalr';
import BaseWSClient from './BaseWSClient';
import { IForecastAggregate, IWSCryptoAggregate } from '../types';

class WSClient extends BaseWSClient {
	private forecastHub = 'hubs/forecast';
	private cryptoHub = 'hubs/crypto';
	private methodName = 'Aggregates';

	constructor(apiKey: string) {
		super(apiKey);
	}

	async streamForecastAggregates(
		forecastId: string,
		identifier: string,
		interval: number,
		subscriber: IStreamSubscriber<IForecastAggregate>
	) {
		return await this.streamSignalRChannel(
			this.forecastHub,
			this.methodName,
			[forecastId, identifier, interval],
			subscriber
		);
	}

	async streamCryptoAggregates(identifier: string, subscriber: IStreamSubscriber<IWSCryptoAggregate>) {
		return await this.streamSignalRChannel(this.cryptoHub, this.methodName, [identifier], subscriber);
	}

	async disconnect(connection: HubConnection) {
		await this.disconnectSignalRConnection(connection);
	}

	unsubscribeStream<T>(subscription: ISubscription<T>) {
		subscription.dispose();
	}
}

export default WSClient;
