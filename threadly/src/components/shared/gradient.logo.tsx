import { LinearGradient } from 'expo-linear-gradient';

import { Octicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';

type GradientLogoProps = {
    size?: number;
};

function GradientLogo({ size = 70 }: GradientLogoProps) {
    return (
        <MaskedView
            maskElement={<Octicons name="mention" size={size} color="white" />}
        >
            <LinearGradient
                colors={['#ffdd55', '#ff543e', '#d9408a', '#6f15fc']}
                style={{ height: size, width: size }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
        </MaskedView>
    );
}

export default GradientLogo;
