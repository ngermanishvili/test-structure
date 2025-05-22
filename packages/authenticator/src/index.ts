type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
};

export type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
};

export async function login(email: string, password: string): Promise<AuthState> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                isAuthenticated: true,
                user: {
                    id: '123',
                    name: 'Test User',
                    email: email,
                    avatarUrl: '/avatar.jpg',
                },
                token: 'mock-jwt-token',
            });
        }, 500);
    });
}

export async function logout(): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, 200);
    });
}

export async function getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: '123',
                name: 'Test User',
                email: 'user@example.com',
                avatarUrl: '/avatar.jpg',
            });
        }, 300);
    });
}