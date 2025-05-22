import { fetchTVHomeData } from './tv';
import { fetchSportData } from './sport';

export class HttpClient {
    private baseURL: string;
    
    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }
    
    async get<T>(endpoint: string): Promise<T> {
        return this.getMockData(endpoint) as T;
    }
    
    private getMockData(endpoint: string) {
        switch (endpoint) {
            case '/pages/home':
                return fetchTVHomeData();
            case '/pages/sport':
                return fetchSportData();
            default:
                return { type: 'not_found' };
        }
    }
}