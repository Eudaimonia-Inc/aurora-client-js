import BaseApiClient from '../src/services/BaseApiClient';

describe('BaseApiClient', () => {
	const apiKey = 'api-key';
	const client = new BaseApiClient(apiKey);

	it('should construct with the provided API key', () => {
		expect(client).toBeDefined();
	});

	it('should add query parameters correctly', () => {
		const url = 'https://example.com/api';
		const queryParams = { param1: 'value1', param2: 'value2', params: ['value3', 'value4'] };
		const result = client['addQueryParams'](url, queryParams);
		expect(result).toContain('?param1=value1&param2=value2&params=value3&params=value4');
	});

	describe('getHeaders', () => {
		it('should return headers with default content type and X-Api-Key', () => {
			const headers = client['getHeaders']();
			expect(headers).toEqual({
				'Content-Type': 'application/json',
				'X-Api-Key': apiKey,
			});
		});

		it('should merge custom headers with default headers', () => {
			const customHeaders = { Authorization: 'Bearer token' };
			const headers = client['getHeaders'](customHeaders);
			expect(headers).toEqual({
				'Content-Type': 'application/json',
				'X-Api-Key': apiKey,
				Authorization: 'Bearer token',
			});
		});
	});
});
