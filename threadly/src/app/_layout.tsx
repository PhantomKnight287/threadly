import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import useLoadedAssets from "../hooks/useLoadAssets";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { View } from "react-native";

preventAutoHideAsync();
function RootLayout() {
  const loaded = useLoadedAssets();
  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await hideAsync();
    }
  }, [loaded]);
  return (
    <View
      style={{ flex: 1, backgroundColor: "transparent" }}
      onLayout={onLayoutRootView}
    >
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Hello World",
          }}
        />
      </Stack>
    </View>
  );
}

export default RootLayout;
