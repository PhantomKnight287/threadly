import dayjs from 'dayjs';
import relativePlugin from 'dayjs/plugin/relativeTime';
import updateLocalePlugin from 'dayjs/plugin/updateLocale';
import { Image } from 'expo-image';

import { WorkSans } from '@/constants/fonts';
import { BuildProfileURL } from '@/helpers/url';
import { Thread } from '@/types';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

import Text from './text';
import View from './view';

dayjs.extend(relativePlugin);
dayjs.extend(updateLocalePlugin);
dayjs.updateLocale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s ago',
        m: '1 min',
        mm: '%d mins',
        h: '1hr',
        hh: '%d hrs',
        d: '1d',
        dd: '%d d',
        M: '1 month',
        MM: '%d months',
        y: 'a yr',
        yy: '%d yrs',
    },
});

export default function ThreadCard(props: Thread) {
    return (
        <View className="flex-1 rounded-lg p-4">
            <View className="flex-1 flex-row">
                <Image
                    source={BuildProfileURL({
                        profileUrl: props.author.profileUrl,
                        username: props.author.username,
                    })}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <View className="flex-1 flex-col">
                    <View className="flex flex-row flex-1">
                        <Text
                            className="text-white ml-2 text-base"
                            style={{
                                fontFamily: WorkSans.WorkSans_600SemiBold,
                            }}
                        >
                            {props.author.username}
                        </Text>
                        <Text className="text-sm text-gray-400 ml-auto">
                            {dayjs(props.createdAt).fromNow(true)}
                        </Text>
                    </View>
                    <Text className="text-white ml-2 text-base">
                        {props.content}
                    </Text>
                    <View className="flex flex-row flex-1 ml-2 mt-4 space-x-4">
                        <AntDesign name="hearto" size={24} color="white" />
                        <Ionicons
                            name="chatbubble-outline"
                            size={24}
                            color="white"
                        />
                        <Feather name="repeat" size={24} color="white" />
                        <Ionicons
                            name="paper-plane-outline"
                            size={24}
                            color="white"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
