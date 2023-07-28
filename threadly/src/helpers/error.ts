export function ErrorMessageExtractor(body: any) {
    if (!body) return 'An Unknown Error Occured';
    if (body.message) {
        if (Array.isArray(body.message)) {
            return body.message[0];
        }
        return body.message;
    }
    if (body.error) {
        if (Array.isArray(body.error)) {
            return body.error[0];
        }
        return body.error;
    }
    return 'An Unknown Error Occured';
}
