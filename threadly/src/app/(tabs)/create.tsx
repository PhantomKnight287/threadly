import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import Input from '@/components/shared/input';
import Text from '@/components/shared/text';
import View from '@/components/shared/view';
import { IMAGE_PLACEHOLDER } from '@/constants';
import { WorkSans } from '@/constants/fonts';
import { BuildProfileURL } from '@/helpers/url';
import useUser from '@/state/user';

export default function Create() {
    const { user } = useUser();
    const [value, setValue] = useState('');
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
                        <Input
                            label=""
                            onChange={setValue}
                            value={value}
                            inputProps={{
                                placeholder: 'Create a thread...',
                                autoFocus: true,
                                multiline: true,
                            }}
                            labelProps={{
                                style: {
                                    display: 'none',
                                },
                            }}
                            hideBorder
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
