type Parameters = {
    profileUrl?: string;
    username: string;
};

export function BuildProfileURL(parameters: Parameters) {
    if (parameters.profileUrl) {
        return parameters.profileUrl;
    } else {
        return `https://api.dicebear.com/6.x/initials/png?seed=${parameters.username}`;
    }
}
