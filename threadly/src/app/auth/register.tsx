import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import Button from '@/components/shared/button';
import GradientLogo from '@/components/shared/gradient.logo';
import Input from '@/components/shared/input';
import Text from '@/components/shared/text';
import View from '@/components/shared/view';
import { API_URL } from '@/constants';
import { ErrorMessageExtractor } from '@/helpers/error';
import useHydrateUser from '@/hooks/useHydrateUser';
import useSetOptions from '@/hooks/useSetOptions';
import useUser from '@/state/user';
import { APIResponse } from '@/types';
import { Entypo } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

interface RegisterForm {
    name: string;
    username: string;
    password: string;
}

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useUser();
    const { setItem } = useAsyncStorage('token');
    const router = useRouter();
    useHydrateUser({ redirectIfNoToken: false });
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<RegisterForm>();
    useSetOptions({
        headerShown: true,
        headerTitle: '',
    });
    const register: SubmitHandler<RegisterForm> = async (data) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const json = (await response.json()) as APIResponse<{
                token: string;
                user: {
                    id: string;
                    name: string;
                    username: string;
                };
            }>;
            if (!response.ok || json.message) {
                throw new Error(ErrorMessageExtractor(json));
            }
            await setItem(json.token);
            setUser(json.user);
            router.replace(`/`);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error.message,
            });
            return;
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user.id) return void router.replace(`/`);
    }, []);

    return (
        <View className="flex-1">
            <View className="my-auto items-center justify-center">
                <GradientLogo />
            </View>
            <View className="mb-auto p-4 space-x-5">
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label=""
                            onChange={onChange}
                            value={value}
                            inputProps={{
                                onBlur,
                                placeholder: 'Name',
                            }}
                            errorMessage={
                                errors.name ? 'Name is required' : undefined
                            }
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    name="username"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label=""
                            onChange={onChange}
                            value={value}
                            inputProps={{
                                onBlur,
                                placeholder: 'Username',
                            }}
                            errorMessage={
                                errors.username
                                    ? 'Username is required'
                                    : undefined
                            }
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label=""
                            onChange={onChange}
                            value={value}
                            inputProps={{
                                onBlur,
                                placeholder: 'Password',
                                secureTextEntry: !showPassword,
                            }}
                            rightIcon={
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    <Entypo
                                        name={
                                            showPassword
                                                ? 'eye-with-line'
                                                : 'eye'
                                        }
                                        size={24}
                                        color={'white'}
                                        style={{
                                            marginRight: 10,
                                        }}
                                    />
                                </TouchableOpacity>
                            }
                            errorMessage={
                                errors.password
                                    ? 'Password is required'
                                    : undefined
                            }
                        />
                    )}
                />
                <Button
                    title="Register"
                    pressableStyles={{
                        marginTop: 20,
                        borderRadius: 20,
                    }}
                    onPress={handleSubmit(register)}
                    loading={loading}
                />
                <View className="flex flex-row items-center mt-4 justify-center">
                    <Text>Already have an account? </Text>
                    <Link href="/auth/login">
                        <Text className="text-blue-500">Login</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
}

export default Register;
