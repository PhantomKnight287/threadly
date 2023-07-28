import { Stack } from 'expo-router';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import useLoadedAssets from '../hooks/useLoadAssets';

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
    );
}

export default RootLayout;
