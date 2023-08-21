# Aurora JS Client

The Aurora JS Client is a JavaScript library that empowers developers to seamlessly interact with the Aurora REST and WebSocket API. With this library, you can effortlessly access data, retrieve forecast information, and execute various operations using both HTTP requests and WebSocket connections.
To get started, please see the Getting Started [Getting Started](https://aurora.eaift.com/#/docs/getting-started) section in our documentation

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
npm install aurora-api-client
# or
yarn add aurora-api-client
```

## Usage

### REST API

The Aurora JS Client provides an intuitive way to interact with the Aurora REST API.

```javascript
import { AuroraApiClient } from 'aurora-api-client';

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
```

### WebSocket API

The WebSocket client allows real-time interactions with the Aurora WebSocket API.

```javascript
import { AuroraWSClient } from 'aurora-api-client';

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
| getColumns                  | callbacks?: ICallbacks<IColumns[]>                                                                     | [Promise<IColumns[]>](#icolumns)                     | Fetch available columns                |
| getForecast                 | Identifier: string, callbacks?: ICallbacks<IForecast[]>                                                | [Promise<IForecast[]>](#iforecast)                   | Retrieve forecast information          |
| getForecastAggregates       | forecastId: string, params: IRequestParams, callbacks?: ICallbacks<IForecastAggregate[]>               | [Promise<IForecastAggregate[]>](#iforecastaggregate) | Fetch forecast aggregates              |
| getLatestForecastAggregates | forecastId: string, params: ILatestAggregatesRequestParams, callbacks?: ICallbacks<IForecastAggregate> | [Promise<IForecastAggregate\>](#iforecastaggregate)   | Get latest forecast aggregates         |
| getForecastAccuracy         | forecastId: string, Identifier: string, callbacks?: ICallbacks<IForecastAccuracy>                      | [Promise<IForecastAccuracy\>](#iforecastaccuracy)     | Retrieve forecast accuracy             |
| streamForecastAggregates    | forecastId: string, ticker: string, subscriber: IStreamSubscriber<IForecastAggregate\>                  | -                                                    | Stream forecast aggregates             |

## Type Definitions

| Type                                                              | Description                              |
| ----------------------------------------------------------------- | ---------------------------------------- |
| [IIdentifier](#iidentifier)                                       | Identifier type                          |
| [IColumn](#icolumn)                                               | Column information                       |
| [IColumns](#icolumns)                                             | Columns with identifier                  |
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

### IColumns

Columns with identifier.

-   Inherits from [IIdentifier](#iidentifier).
-   `columns`: Array of [IColumn](#icolumn).

### IForecast

Forecast information.

-   `forecastId`: string
-   `forecastName`: string

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
