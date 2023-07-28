import { create } from 'zustand';

export interface User {
    id: string;
    name: string;
    username: string;
    profileUrl?: string;
}
export interface UserState {
    user: User;
    setUser: (user: User) => void;
    logOut: () => void;
}

const useUser = create<UserState>((setter) => ({
    user: {
        id: '',
        name: '',
        username: '',
        profileUrl: '',
    },
    setUser: (user) => setter({ user }),
    logOut: () => setter({ user: { id: '', name: '', username: '' } }),
}));

export default useUser;
