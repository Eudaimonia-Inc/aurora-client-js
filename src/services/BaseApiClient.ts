import { fetch } from 'cross-fetch';
import { IResponse, TBaseParams } from '../types';
import { baseUrl } from '../constants/baseUrl';

class BaseApiClient {
	private readonly baseURL: string = baseUrl;
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
			params?: TBaseParams;
			callbacks?: { error?: (error: any) => void; success?: (data?: T) => void };
		}
	): Promise<T> {
		const { options, customHeaders, params, callbacks } = requestParams;
		let url = `${this.baseURL}${path}`;
		const headers = this.getHeaders(customHeaders);
		if (params) {
			url = this.addQueryParams(url, params);
		}

		try {
			const response = await fetch(url, { ...options, headers });
			const data: IResponse<T> = await response.json();
			const results = data.results;
			if (!response.ok) {
				throw new Error(`Request failed with status: ${response.status}\n${data.message || 'Unknown error'}`);
			}

			callbacks?.success && callbacks?.success(results);
			return results;
		} catch (error) {
			callbacks?.error && callbacks?.error(error);
			throw new Error(`Request error: ${error.message}`);
		}
	}
}

export default BaseApiClient;
