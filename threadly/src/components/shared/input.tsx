import { ReactNode } from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    TextProps,
    View,
} from 'react-native';

import { WorkSans } from '@/constants/fonts';

import Text from './text';

interface InputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    errorMessage?: string;
    errorMessageProps?: TextProps;
    inputProps?: TextInputProps;
    labelProps?: TextProps;
    rightIcon?: ReactNode;
    noLabel?: boolean;
}

export default function Input(props: InputProps) {
    return (
        <View>
            <Text
                {...props.labelProps}
                style={StyleSheet.flatten([
                    {
                        fontFamily: WorkSans.WorkSans_600SemiBold,
                        marginBottom: 5,
                        fontSize: 16,
                        display: props.noLabel ? 'none' : 'flex',
                    },
                    props.labelProps?.style,
                ])}
            >
                {props.label}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 10,
                    alignItems: 'center',
                    width: '100%',
                    borderColor: '#989898',
                    borderRadius: 5,
                    borderWidth: 1,
                    paddingRight: props.rightIcon ? 0 : 10,
                }}
            >
                <TextInput
                    value={props.value}
                    onChangeText={props.onChange}
                    {...props.inputProps}
                    placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                    style={StyleSheet.flatten([
                        {
                            borderTopRightRadius: props.rightIcon ? 0 : 5,
                            borderBottomRightRadius: props.rightIcon ? 0 : 5,
                            padding: 10,
                            width: props.rightIcon ? '90%' : '100%',
                            color: 'white',
                            fontFamily: WorkSans.WorkSans_400Regular,
                        },
                        props.inputProps?.style,
                    ])}
                />
                {props.rightIcon}
            </View>
            {props.errorMessage ? (
                <Text
                    {...props.errorMessageProps}
                    style={StyleSheet.flatten([
                        {
                            color: 'red',
                            fontFamily: WorkSans.WorkSans_600SemiBold,
                        },
                        props.errorMessageProps?.style,
                    ])}
                >
                    {props.errorMessage}
                </Text>
            ) : null}
        </View>
    );
}
