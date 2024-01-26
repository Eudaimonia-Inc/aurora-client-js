export interface IMarketNewsArticle {
    id: string;
    title: string;
    text: string;
    imageUrl: string;
    newsUrl: string;
    sourceName: string;
    sentiment: string;
    type: string;
    createDate: string;
    marketTopics: string[];
  }
  
  export interface IMarketNewsEvent {
    id: string;
    eventName: string;
    eventText: string;
    createDate: string;
    newsItems: string;
    tickers: string[];
  }
  