import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import Text from '@/components/shared/text';
import View from '@/components/shared/view';
import useHydrateUser from '@/hooks/useHydrateUser';
import useSetOptions from '@/hooks/useSetOptions';

export default function Page() {
    useSetOptions({});
    useHydrateUser({
        redirectIfNoToken: true,
    });
    return (
        <View className={'bg-dark flex-1 items-center p-6'}>
            <View style={styles.main}>
                <Text className="text-4xl font-bold text-center text-blue-500">
                    Hello World
                </Text>
                <Text style={styles.subtitle}>
                    This is the first page of your app.
                </Text>
                <Link href={'/auth/register'}>
                    <Text className="text-2xl font-bold text-center text-blue-500">
                        Register
                    </Text>
                </Link>
                <Link href={'/auth/login'}>
                    <Text className="text-2xl font-bold text-center text-blue-500">
                        Login
                    </Text>
                </Link>
                <Link href="(tabs)">
                    <Text>
                        Hello
                    </Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        maxWidth: 960,
        marginHorizontal: 'auto',
    },
    title: {
        fontSize: 64,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 36,
        color: '#38434D',
    },
});
