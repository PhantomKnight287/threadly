export type APIResponse<T> = T & {
    message?: string | string[];
};
