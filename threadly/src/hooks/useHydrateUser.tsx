import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import useUser from '@/state/user';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';

import { API_URL } from '../constants';

export default function useHydrateUser(props?: { redirectIfNoToken: boolean }) {
    const user = useUser();
    const { getItem } = useAsyncStorage('token');
    const { replace } = useRouter();
    const netInfo = useNetInfo();
    async function hydrate() {
        if (netInfo.isConnected !== true) return;
        if (user.user.id) return;
        const token = await getItem().catch((err) => null);
        if (!token) {
            if (props?.redirectIfNoToken) {
                return void replace('/auth/login');
            }
            return;
        }
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }).catch((err) => null);
        if (!response || !response.ok || response.status !== 200) {
            return;
        }
        const data = await response.json();
        user.setUser(data);
    }
    useEffect(() => {
        hydrate().catch((err) => {});
    }, [netInfo.isConnected]);
    return hydrate;
}
