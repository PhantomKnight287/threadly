import {
    ActivityIndicator,
    ActivityIndicatorProps,
    Pressable,
    StyleProp,
    StyleSheet,
    TextStyle,
    ViewStyle,
} from 'react-native';

import { BRAND_COLOR } from '../../constants';
import Text from './text';

interface Props {
    title: string;
    onPress?: any;
    backgroundColor?: string;
    pressableStyles?: StyleProp<ViewStyle>;
    textStyles?: StyleProp<TextStyle>;
    loading?: boolean;
    activityIndicationProps?: ActivityIndicatorProps;
    disabled?: boolean;
}

export default function Button(props: Props) {
    const {
        onPress,
        title,
        backgroundColor,
        pressableStyles,
        textStyles,
        activityIndicationProps,
        loading = false,
        disabled = false,
    } = props;
    const b = backgroundColor || BRAND_COLOR;
    return (
        <Pressable
            style={StyleSheet.flatten([
                styles.button,
                {
                    backgroundColor: loading || disabled ? `${b}80` : b,
                    shadowColor: 'transparent',
                },
                pressableStyles,
            ])}
            onPress={loading || disabled === true ? undefined : onPress}
        >
            {loading === false ? (
                <Text style={StyleSheet.flatten([styles.text, textStyles])}>
                    {title}
                </Text>
            ) : (
                <ActivityIndicator
                    {...activityIndicationProps}
                    style={{ backgroundColor: 'transparent' }}
                />
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
