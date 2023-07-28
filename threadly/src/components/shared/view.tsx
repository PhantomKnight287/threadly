import { View as RNView } from 'react-native';
import { ViewProps } from 'react-native';

export default function View(props: ViewProps) {
    return (
        <RNView
            {...props}
            style={[
                {
                    backgroundColor: '#0d0d0d',
                },
                props.style,
            ]}
        />
    );
}
