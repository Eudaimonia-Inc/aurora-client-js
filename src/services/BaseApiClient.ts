import { fetch } from 'cross-fetch';
import { IResponse, TBaseParams } from '../types';

class BaseApiClient {
	private readonly baseURL: string = 'https://slrs31easconsumerservices.eaift.com/';
	private readonly apiKey: string;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	private getHeaders(customHeaders?: Record<string, string>): Record<string, string> {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			'X-Api-Key': this.apiKey,
			...customHeaders,
		};

		return headers;
	}

	protected addQueryParams(url: string, queryParams: TBaseParams): string {
		const queryString = Object.keys(queryParams)
			.map((key) => {
				const value = queryParams[key];
				if (Array.isArray(value)) {
					return value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`).join('&');
				}
				return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
			})
			.join('&');

		return url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`;
	}

	protected async fetchClient<T>(
		path: string,
		requestParams?: {
			options?: RequestInit;
			customHeaders?: Record<string, string>;
			queryParams?: TBaseParams;
			callbacks?: { error?: (error: any) => void; success?: (data?: T) => void };
		}
	): Promise<T> {
		const { options, customHeaders, queryParams, callbacks } = requestParams;
		let url = `${this.baseURL}${path}`;
		const headers = this.getHeaders(customHeaders);
		if (queryParams) {
			url = this.addQueryParams(url, queryParams);
		}

		try {
			const response = await fetch(url, { ...options, headers });
			const data: IResponse<T> = await response.json();
			const result = data.result;
			if (!response.ok) {
				throw new Error(`Request failed with status: ${response.status}\n${data.message || 'Unknown error'}`);
			}

			callbacks?.success && callbacks?.success(result);
			return result;
		} catch (error) {
			callbacks?.error && callbacks?.error(error);
			throw new Error(`Request error: ${error.message}`);
		}
	}
}

export default BaseApiClient;
