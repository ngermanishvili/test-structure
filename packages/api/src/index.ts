import { fetchUserProfile } from './users';
import { fetchTVHomeData } from './tv';
import { fetchSportData } from './sport';

import { HttpClient } from './https';
import { API_CONFIG } from './config';

const httpClient = new HttpClient(API_CONFIG.baseURL);


export async function fetchPageData(slug: string) {
    try {
        //! რეალ აპის გამოძახება
        // return await httpClient.get(`/pages/${slug}`);
        
        // For now, keep mock logic:
        switch (slug) {
            case 'home':
                return await fetchTVHomeData();
            case 'sport':
                return await fetchSportData();
            default:
                return { type: 'not_found' };
        }
    } catch (error) {
        console.error('API Error:', error);
        return { type: 'not_found' };
    }
}

export {
    fetchUserProfile,
    fetchTVHomeData,
    fetchSportData 
};