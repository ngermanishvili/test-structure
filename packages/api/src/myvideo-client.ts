export class MyVideoApiClient {
    private baseURL: string = 'https://api-test.myvideo.ge/api/v1';
    private token: string | null = null;

    setToken(token: string) {
        this.token = token;
    }

    private getHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'myvideo.ge',
            'User-Agent': 'MyVideo/1.0',
            'Authorization': `Bearer ${this.token}`,
        };
    }

    private getAuthHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'myvideo.ge',
            'User-Agent': 'MyVideo/1.0',
        };
    }

    async get<T>(endpoint: string): Promise<T> {
        console.log(`🚀 Fetching: ${this.baseURL}${endpoint}`);
        console.log('📝 Headers:', this.getHeaders());

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'GET',
                headers: this.getHeaders(),
            });

            console.log(`📊 Response Status: ${response.status} ${response.statusText}`);

            const responseHeaders: Record<string, string> = {};
            response.headers.forEach((value, key) => {
                responseHeaders[key] = value;
            });
            console.log('📋 Response Headers:', responseHeaders);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Error Response:', errorText);
                throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            console.log('✅ Success Response:', data);
            return data;

        } catch (error) {
            console.error('🔥 Network Error:', error);
            throw error;
        }
    }

    async getAuthToken(
        username: string, 
        password: string, 
        clientId: string, 
        clientSecret: string
    ): Promise<any> {
        const params = new URLSearchParams({
            grant_type: 'password',
            client_id: clientId,
            client_secret: clientSecret,
            username: username,
            password: password,
        });

        console.log('🔐 Requesting auth token...');
        console.log('📝 Auth params:', Object.fromEntries(params.entries()));

        try {
            const response = await fetch(`${this.baseURL}/auth/token`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: params.toString(),
            });

            console.log(`📊 Auth Response Status: ${response.status} ${response.statusText}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Auth Error Response:', errorText);
                throw new Error(`Auth failed: ${response.status} - ${errorText}`);
            }

            const tokenData = await response.json();
            console.log('✅ Auth Success:', tokenData);
            
            if (tokenData.access_token) {
                this.setToken(tokenData.access_token);
            }
            
            return tokenData;

        } catch (error) {
            console.error('🔥 Auth Network Error:', error);
            throw error;
        }
    }
}

export const myVideoApiClient = new MyVideoApiClient();
