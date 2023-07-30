import { Image } from 'expo-image';
import { Tabs, useNavigation } from 'expo-router';
import React, { ComponentProps, useLayoutEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import Input from '@/components/shared/input';
import Text from '@/components/shared/text';
import View from '@/components/shared/view';
import { API_URL, IMAGE_PLACEHOLDER } from '@/constants';
import { WorkSans } from '@/constants/fonts';
import { ErrorMessageExtractor } from '@/helpers/error';
import { BuildProfileURL } from '@/helpers/url';
import useUser from '@/state/user';
import { APIResponse } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

interface CreateForm {
    content: string;
}

export default function Create() {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<CreateForm>();
    const { setOptions } = useNavigation();
    const { getItem: getToken } = useAsyncStorage('token');

    const onSubmit: SubmitHandler<CreateForm> = async (data) => {
        setLoading(true);
        try {
            const token = await getToken();
            const req = await fetch(`${API_URL}/threads`, {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!req.ok) {
                return Toast.show({
                    type: 'error',
                    text1: 'Error creating thread',
                });
            }
            const json = (await req.json()) as APIResponse<{
                id: string;
            }>;
            if (json.message)
                return Toast.show({
                    type: 'error',
                    text1: ErrorMessageExtractor(json),
                });
            Toast.show({
                type: 'success',
                text1: 'Thread created',
            });
            reset();
        } catch (e) {
            console.log(e);
            return Toast.show({
                type: 'error',
                text1: 'Error creating thread',
            });
        } finally {
            setLoading(false);
        }
    };
    useLayoutEffect(() => {
        setOptions({
            headerRight(props) {
                if (loading === true)
                    return (
                        <ActivityIndicator
                            color="#00ff00"
                            style={{
                                marginRight: 10,
                            }}
                        />
                    );
                return (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            handleSubmit(onSubmit)();
                        }}
                    >
                        <Ionicons
                            name="send"
                            size={24}
                            color="#00ff00"
                            style={{
                                marginRight: 10,
                            }}
                        />
                    </TouchableOpacity>
                );
            },
        } satisfies ComponentProps<(typeof Tabs)['Screen']>['options']);
    }, [loading]);
    return (
        <ScrollView
            style={{
                backgroundColor: '#0d0d0d',
                height: '100%',
            }}
        >
            <View className="flex-1 p-4 border-t-2 border-[#1a1a1a]">
                <View className="flex flex-row ">
                    <Image
                        source={BuildProfileURL({
                            profileUrl: user.profileUrl,
                            username: user.username,
                        })}
                        className="w-10 h-10 rounded-full"
                        transition={300}
                        placeholder={IMAGE_PLACEHOLDER}
                    />
                    <View className="flex-col flex-1">
                        <Text
                            className="text-white ml-2 text-lg"
                            style={{
                                fontFamily: WorkSans.WorkSans_500Medium,
                            }}
                        >
                            {user.username}
                        </Text>
                        <Controller
                            control={control}
                            name="content"
                            rules={{
                                required: true,
                            }}
                            render={({
                                field: { value, onBlur, onChange },
                            }) => (
                                <Input
                                    label=""
                                    onChange={onChange}
                                    value={value}
                                    inputProps={{
                                        placeholder: 'Create a thread...',
                                        autoFocus: true,
                                        multiline: true,
                                        onBlur,
                                        style: {
                                            fontSize: 16,
                                        },
                                    }}
                                    labelProps={{
                                        style: {
                                            display: 'none',
                                        },
                                    }}
                                    hideBorder
                                    errorMessage={
                                        errors.content
                                            ? 'Please enter content of your thread.'
                                            : undefined
                                    }
                                />
                            )}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
