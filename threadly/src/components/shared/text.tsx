import { Text as RNText } from 'react-native';
import { TextProps } from 'react-native';

import { WorkSans } from '@/constants/fonts';

export default function Text(props: TextProps) {
    return (
        <RNText
            {...props}
            style={[
                { fontFamily: WorkSans.WorkSans_400Regular, color: 'white' },
                props.style,
            ]}
        />
    );
}
