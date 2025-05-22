export type Session = {
    userId: string;
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
};

export type LoginFormState = {
    success: boolean;
    error?: string;
};

export type User = {
    id: string;
    email: string;
    name: string;
};