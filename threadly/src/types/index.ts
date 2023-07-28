export type APIResponse<T> = {
    message?: string | string[];
    data?: T;
};
