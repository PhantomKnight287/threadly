export type APIResponse<T> = T & {
    message?: string | string[];
};

export interface Thread {
    id: string;
    content: string;
    edited?: boolean;
    createdAt: string;
    author: {
        id: string;
        username: string;
        name: string;
        profileUrl: string;
    };
}
