import { myVideoApiClient } from './myvideo-client';

export type DashboardResponse = {
    data?: any;
    message?: string;
    status?: string;
    success?: boolean;
    [key: string]: any;
};

export type AuthTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    scope?: string;
};

export async function authenticateUser(
    username: string,
    password: string,
    clientId: string = '7',
    clientSecret: string = 'BTf4tSzWBbhJoEQd7VmBftzNWHTXKywFDz8JUtGt'
): Promise<AuthTokenResponse> {
    return myVideoApiClient.getAuthToken(username, password, clientId, clientSecret);
}

export async function fetchDashboardMain(token: string): Promise<DashboardResponse> {
    myVideoApiClient.setToken(token);
    return myVideoApiClient.get<DashboardResponse>('/dashboard/mobile/main');
}

export async function fetchUserProfile(token: string): Promise<any> {
    myVideoApiClient.setToken(token);
    return myVideoApiClient.get<any>('/user/profile');
}

export async function fetchChannels(token: string): Promise<any> {
    myVideoApiClient.setToken(token);
    return myVideoApiClient.get<any>('/channels');
}
