import { Stack } from 'expo-router';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useLoadedAssets from '../hooks/useLoadAssets';

export const queryClient = new QueryClient();

preventAutoHideAsync();
function RootLayout() {
    const loaded = useLoadedAssets();
    const onLayoutRootView = useCallback(async () => {
        if (loaded) {
            await hideAsync();
        }
    }, [loaded]);
    if (!loaded) return null;
    return (
        <QueryClientProvider client={queryClient}>
            <View
                style={{ flex: 1, backgroundColor: 'transparent' }}
                onLayout={onLayoutRootView}
            >
                <StatusBar style="light" />
                <Stack
                    screenOptions={{
                        animation: 'slide_from_right',
                    }}
                >
                    <Stack.Screen
                        name="index"
                        options={{
                            title: 'Hello World',
                        }}
                    />
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack>
                <Toast />
            </View>
        </QueryClientProvider>
    );
}

export default RootLayout;

export { ErrorBoundary } from 'expo-router';
