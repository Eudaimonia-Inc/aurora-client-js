export interface IAggregatesPrice {
    identifier: string;
    iconUrl: string;
    displayName: string;
    currencySymbol: string;
    baseCurrencySymbol: string;
    price: number;
    change: number;
    high: number;
    low: number;
    chart: number[];
}