import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import Button from '@/components/shared/button';
import Text from '@/components/shared/text';
import View from '@/components/shared/view';
import { API_URL, IMAGE_PLACEHOLDER } from '@/constants';
import { WorkSans } from '@/constants/fonts';
import { BuildProfileURL } from '@/helpers/url';
import useUser from '@/state/user';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function Profile() {
    const { getItem: getToken } = useAsyncStorage('token');
    const { user: loggedInUser } = useUser();
    const [user, setUser] = useState<typeof loggedInUser | null>(null);
    const [activeTab, setActiveTab] = useState<'threads' | 'replies'>(
        'threads',
    );
    async function getProfile() {
        const token = await getToken();
        const res = await fetch(`${API_URL}/profile/${loggedInUser.username}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) throw new Error('Error loading profile');
        const data = await res.json();
        setUser(data);
    }
    useEffect(() => {
        try {
            getProfile();
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: __DEV__ ? e.message : 'Error loading profile',
            });
        }
    }, []);
    if (!user)
        return (
            <View className="flex-1 p-4">
                <View className="items-center justify-center">
                    <ActivityIndicator size="large" color="white" />
                </View>
            </View>
        );
    return (
        <View className="flex-1">
            <View className="p-4">
                <View className="flex flex-row items-center">
                    <View className="flex-col">
                        <Text
                            className="text-2xl"
                            style={{
                                fontFamily: WorkSans.WorkSans_700Bold,
                            }}
                        >
                            {user.name}
                        </Text>
                        <View className="flex-row items-center">
                            <Text className="text-base">@{user.username}</Text>
                            <View className="ml-2 bg-[#131313] rounded-xl py-1 px-2">
                                <Text className="text-gray-300 text-sm">
                                    threadly.net
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className="ml-auto">
                        <Image
                            source={BuildProfileURL({
                                username: user.username,
                                profileUrl: user.profileUrl,
                            })}
                            style={{
                                width: 72,
                                height: 72,
                                borderRadius: 100,
                            }}
                            placeholder={IMAGE_PLACEHOLDER}
                            transition={1000}
                        />
                    </View>
                </View>
                <View className="mt-8 flex-row items-center justify-around space-x-2">
                    <Button
                        title="Edit Profile"
                        pressableStyles={{
                            backgroundColor: 'transparent',
                            borderColor: '#131313',
                            borderWidth: 2,
                            borderRadius: 10,
                            width: '48%',
                            paddingVertical: 8,
                        }}
                        textStyles={{
                            fontFamily: WorkSans.WorkSans_300Light,
                        }}
                    />
                    <Button
                        title="Share Profile"
                        pressableStyles={{
                            backgroundColor: 'transparent',
                            borderColor: '#131313',
                            borderWidth: 2,
                            borderRadius: 10,
                            width: '48%',
                            paddingVertical: 8,
                        }}
                        textStyles={{
                            fontFamily: WorkSans.WorkSans_300Light,
                        }}
                    />
                </View>
            </View>
            <View className="mt-4">
                <View className="flex-row items-center justify-around">
                    <Button
                        title="Threads"
                        pressableStyles={{
                            width: '50%',
                            paddingVertical: 8,
                            backgroundColor: 'transparent',
                            borderBottomWidth: 1,
                            borderBottomColor:
                                activeTab === 'threads' ? 'white' : '#131313',
                        }}
                        textStyles={{
                            fontFamily: WorkSans.WorkSans_300Light,
                            color: 'white',
                        }}
                        onPress={() => setActiveTab('threads')}
                    />
                    <Button
                        title="Replies"
                        pressableStyles={{
                            width: '50%',
                            paddingVertical: 8,
                            backgroundColor: 'transparent',
                            borderBottomWidth: 1,
                            borderBottomColor:
                                activeTab === 'replies' ? 'white' : '#131313',
                        }}
                        textStyles={{
                            fontFamily: WorkSans.WorkSans_300Light,
                            color: 'white',
                        }}
                        onPress={() => setActiveTab('replies')}
                    />
                </View>
            </View>
        </View>
    );
}
