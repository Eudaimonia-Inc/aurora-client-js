# Aurora JS Client

The Aurora JS Client is a JavaScript library that empowers developers to seamlessly interact with the Aurora REST and WebSocket API. With this library, you can effortlessly access data, retrieve forecast information, and execute various operations using both HTTP requests and WebSocket connections.
To get started, please see the [Getting Started](https://aurora.eaift.com/#/docs) section in our documentation

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
    -   [REST API](#rest-api)
    -   [WebSocket API](#websocket-api)
-   [API Reference](#api-reference)
-   [Type Definitions](#type-definitions)
-   [License](#license)

## Installation

Install it using npm or yarn:

```bash
npm install aurora-client-js
# or
yarn add aurora-client-js
```

## Usage

Our WebSocket and REST APIs are designed around entitlements, ensuring you connect to the right hubs and access the data you need. For personalized examples, including your API key and entitlements, please [login](https://aurora.eaift.com/#/signin).

To utilize the Crypto WebSocket and REST endpoints, there are two key prerequisites that need to be met:

1. **Subscription Plan**: To access our REST API and WebSocket endpoints, you need an active subscription plan. Ensure that your subscription plan is up-to-date and grants you access to the specific API and WebSocket hubs you intend to use.
2. **API Key**: You must possess a valid API key, which serves as your authentication token for accessing both the REST API and WebSocket endpoints. If you haven't generated an API key yet, you can create one by visiting the [API Key creation page](https://aurora.eaift.com/#/api-keys).

Once you have an API key and an active subscription plan, you are ready to start using both the REST API and WebSocket endpoints to access real-time cryptocurrency data and Forecast insights.

### REST API
The Aurora JS Client provides an intuitive way to interact with the Aurora REST API.

```javascript
import { AuroraApiClient } from 'aurora-client-js';

// Create a new API client instance with your API key
const apiKey = 'your-api-key';
const apiClient = new AuroraApiClient(apiKey);

// Use the client to fetch identifiers
apiClient
	.getIdentifiers()
	.then((identifiers) => {
		console.log('Identifiers:', identifiers);
	})
	.catch((error) => {
		console.error('An error happened:', error);
	});

// Fetch forecast data
apiClient
	.getForecast('X:BTCUSD')
	.then((forecastData) => {
		console.log('Forecast Data:', forecastData);
	})
	.catch((error) => {
		console.error('An error happened:', error);
	});

// Fetch forecast aggregates
apiClient
	.getForecastAggregates('X:BTCUSD', {
		From: 1695359590,
		To: 1695995617,
		Interval: 60,
		Columns: ['Close'],
		ForecastId: 'forecast-id'
	})
	.then((forecastAggregates) => {
		console.log('Forecast Aggregates:', forecastAggregates);
	})
	.catch((error) => {
		console.error('An error happened:', error);
	});


```

### WebSocket API

The WebSocket client allows real-time interactions with the Aurora WebSocket API.

```javascript
import { AuroraWSClient } from 'aurora-client-js';

// Create a new WebSocket client instance with your API key
const apiKey = 'your-api-key';
const wsClient = new AuroraWSClient(apiKey);

// Stream forecast aggregates
const { connection, subscription } = wsClient.streamForecastAggregates('your-forecast-id', 'X:BTCUSD', {
	next: (data) => console.log('Received forecast aggregate:', data),
	complete: () => console.log('SignalR stream completed.'),
	error: (err) => console.error('SignalR stream error: ', err),
});

// Disconnect the WebSocket connection
wsClient.disconnect(connection);
// Unsubscribe from stream
wsClient.unsubscribe(subscription);
```

## API Reference

| Method                      | Arguments                                                                                              | Return Type                                          | Description                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | -------------------------------------- |
| getIdentifiers              | callbacks?: ICallbacks[IIdentifier[]>                                                                  | [Promise<IIdentifier[]>](#iidentifier)               | Fetch identifiers for data exploration |
| getColumns                  | callbacks?: ICallbacks<IColumn[]>                                                                     | [Promise<IColumn[]>](#icolumns)                     | Fetch available columns                |
| getForecast                 | identifier: string, callbacks?: ICallbacks<IForecast[]>                                                | [Promise<IForecast[]>](#iforecast)                   | Retrieve forecast information          |
| getForecastAggregates       | identifier: string, params: IRequestParams, callbacks?: ICallbacks<IForecastAggregate[]>               | [Promise<IForecastAggregate[]>](#iforecastaggregate) | Fetch forecast aggregates              |
| getLatestForecastAggregates | identifier: string, params: ILatestAggregatesRequestParams, callbacks?: ICallbacks<IForecastAggregate> | [Promise<IForecastAggregate\>](#iforecastaggregate)   | Get latest forecast aggregates         |
| getForecastAccuracy         | identifier: string, ForecastId: string, callbacks?: ICallbacks<IForecastAccuracy>                      | [Promise<IForecastAccuracy\>](#iforecastaccuracy)     | Retrieve forecast accuracy             |
| getHistoricalAggregates     | identifier: string, params: IHistoricalAggregatesRequestParams, callbacks?: ICallbacks<IForecastAccuracy>                      | [Promise<ICryptoAggregates\>](#iforecastaccuracy)     | Fetch crypto aggregates             |
| streamForecastAggregates    | forecastId: string, identifier: string, period: number (minutes), subscriber: IStreamSubscriber<IForecastAggregate\>                  | -                                                    | Stream forecast aggregates             |
| streamCryptoAggregates      | identifier: string, subscriber: IStreamSubscriber<WSCryptoAggregate\>                  | -                                                    | Stream crypto aggregates             |

## Type Definitions

| Type                                                              | Description                              |
| ----------------------------------------------------------------- | ---------------------------------------- |
| [IIdentifier](#iidentifier)                                       | Identifier type                          |
| [IColumn](#icolumn)                                               | Column information                       |
| [IForecast](#iforecast)                                           | Forecast information                     |
| [IAggregate](#iaggregate)                                         | Aggregate data point                     |
| [IForecastAggregate](#iforecastaggregate)                         | Forecast aggregate information           |
| [IForecastAccuracy](#iforecastaccuracy)                           | Forecast accuracy information            |
| [IRequestParams](#irequestparams)                                 | Request parameters for specific calls    |
| [ILatestAggregatesRequestParams](#ilatestaggregatesrequestparams) | Request parameters for latest aggregates |

### IIdentifier

Identifier type.

-   `identifier`: string

### IColumn

Column information.

-   `name`: string
-   `type`: string
-   `isNullable`: boolean

### IForecast

Forecast information.

-   `id`: string
-   `name`: string

### IAggregate

Aggregate data point.

-   `Close`: number
-   `Timestamp`: number

### IForecastAggregate

Forecast aggregate information.

-   `from`: number
-   `to`: number
-   `step`: number
-   `aggregates`: Array of [IAggregate](#iaggregate).

### IForecastAccuracy

Forecast accuracy information.

-   `Close_mae`: number
-   `Close_rmse`: number

### IRequestParams

Request parameters for specific calls.

-   `Identifier`: string
-   `StartDate` (optional): string
-   `EndDate` (optional): string
-   `Fields` (optional): string array

### ILatestAggregatesRequestParams

Request parameters for latest aggregates.

-   `Identifier`: string
-   `Fields` (optional): string array
