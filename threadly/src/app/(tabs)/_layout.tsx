import { Redirect, Tabs } from 'expo-router';

import GradientLogo from '@/components/shared/gradient.logo';
import Text from '@/components/shared/text';
import { WorkSans } from '@/constants/fonts';
import useUser from '@/state/user';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
    const { user } = useUser();
    if (!user) return <Redirect href={'/auth/login'} />;
    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#0d0d0d',
                },
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTitle() {
                    return <GradientLogo size={30} />;
                },
                tabBarStyle: {
                    backgroundColor: '#0d0d0d',
                    shadowColor: 'transparent',
                    borderTopWidth: 0,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name={focused ? 'home' : 'home-outline'}
                                size={32}
                                color={'white'}
                            />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: '',
                    tabBarIcon: () => {
                        return (
                            <Feather
                                name={'search'}
                                size={32}
                                color={'white'}
                            />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: '',
                    headerTitleAlign: 'left',
                    headerTitle: () => (
                        <Text
                            className="text-xl"
                            style={{
                                fontFamily: WorkSans.WorkSans_500Medium,
                            }}
                        >
                            New Thread
                        </Text>
                    ),
                    tabBarIcon: () => {
                        return (
                            <Ionicons
                                name={'ios-create'}
                                size={32}
                                color={'white'}
                            />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AntDesign
                                name={focused ? 'heart' : 'hearto'}
                                size={28}
                                color={'white'}
                            />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name={
                                    focused
                                        ? 'ios-person'
                                        : 'ios-person-outline'
                                }
                                size={28}
                                color={'white'}
                            />
                        );
                    },
                }}
            />
        </Tabs>
    );
}
