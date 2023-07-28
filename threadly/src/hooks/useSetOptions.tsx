import { Stack, useNavigation } from 'expo-router';
import { ComponentProps, DependencyList, useLayoutEffect } from 'react';

import { DARK_COLOR } from '@/constants';
import { WorkSans } from '@/constants/fonts';

export default function useSetOptions(
    props: ComponentProps<typeof Stack>['screenOptions'],
    deps?: DependencyList,
) {
    const { setOptions } = useNavigation();
    useLayoutEffect(() => {
        setOptions({
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontFamily: WorkSans.WorkSans_600SemiBold,
            },
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerStyle: {
                backgroundColor: DARK_COLOR,
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            ...props,
        });
    }, deps);
}
