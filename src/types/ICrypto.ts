export interface WSCryptoAggregate {
	time: number;
	identifier: string;
	event: string;
	volumeWeighted: number;
    open: number;
	high: number;
	low: number;
	close: number;
	volume?: number;
	turnover?: number;
}
