import {
	HttpTransportType,
	HubConnection,
	HubConnectionBuilder,
	IStreamSubscriber,
	ISubscription,
} from '@microsoft/signalr';

class BaseWSClient {
	private readonly baseURL: string = 'https://auroracapi.eaift.com/';
	protected readonly apiKey: string;
	protected connection: HubConnection;
	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}
	protected async connectToSignalRHub(hubName: string, apiKeyAsToken?: boolean): Promise<HubConnection> {
		try {
			const connection = new HubConnectionBuilder()
				.withUrl(this.baseURL + hubName, {
					skipNegotiation: true,
					transport: HttpTransportType.WebSockets,
					accessTokenFactory: apiKeyAsToken ? () => this.apiKey : undefined,
				})
				.build();
			this.connection = connection;
			await connection.start();
			return connection;
		} catch (error) {
			console.error(`Error connecting to SignalR hub: ${error}`);
			throw new Error(`SignalR hub connection error: ${error}`);
		}
	}

	protected async streamSignalRChannel<T>(
		hubName: string,
		methodName: string,
		args: any[],
		subscriber: IStreamSubscriber<T>,
		apiKeyAsToken?: boolean
	): Promise<{ connection: HubConnection; subscription: ISubscription<T> } | null> {
		try {
			const connection = await this.connectToSignalRHub(hubName, apiKeyAsToken);
			const stream = apiKeyAsToken
				? connection.stream<T>(methodName, ...args)
				: connection.stream<T>(methodName, this.apiKey, ...args);
			const subscription = stream.subscribe(subscriber);
			return { connection, subscription };
		} catch (error) {
			console.error(`Error invoking method ${methodName}: ${error}`);
			throw new Error(`Stream initialization error: ${error}`);
		}
	}

	protected async disconnectSignalRConnection(connection: HubConnection): Promise<void> {
		if (connection && connection.state === 'Connected') {
			await connection.stop();
		}
	}
}

export default BaseWSClient;
