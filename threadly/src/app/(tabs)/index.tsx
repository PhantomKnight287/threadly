import React from 'react';
import { ActivityIndicator } from 'react-native';

import ThreadCard from '@/components/shared/card';
import Text from '@/components/shared/text';
import View from '@/components/shared/view';
import { API_URL } from '@/constants';
import { Thread } from '@/types';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function Base() {
    const { getItem: getToken } = useAsyncStorage('token');
    const { isLoading, data, isError, error, fetchNextPage, hasNextPage } =
        useInfiniteQuery<{
            next?: number;
            threads: Thread[];
        }>({
            queryKey: ['threads'],
            queryFn: async ({ pageParam = 10 }) => {
                const token = await getToken();
                const res = await fetch(`${API_URL}/threads`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                return await res.json();
            },
            getNextPageParam: (lastPage) => lastPage?.next,
        });
    return (
        <View className="flex-1">
            {isLoading === true ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="white" />
                </View>
            ) : (
                <>
                    {isError === true ? (
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-white">
                                {(error as Error).message}
                            </Text>
                        </View>
                    ) : (
                        <>
                            <FlashList
                                keyExtractor={(item) => item.id}
                                data={data?.pages?.flatMap(
                                    (page) => page.threads,
                                )}
                                renderItem={({ item }) => (
                                    <ThreadCard {...item} />
                                )}
                                estimatedItemSize={100}
                                onEndReached={() => {
                                    if (hasNextPage) {
                                        fetchNextPage();
                                    }
                                }}
                            />
                        </>
                    )}
                </>
            )}
        </View>
    );
}
