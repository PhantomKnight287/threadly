import { LinearGradient } from 'expo-linear-gradient';

import { Octicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';

function GradientLogo() {
    return (
        <MaskedView
            maskElement={<Octicons name="mention" size={70} color="white" />}
        >
            <LinearGradient
                colors={['#ffdd55', '#ff543e', '#d9408a', '#6f15fc']}
                style={{ height: 70, width: 70 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
        </MaskedView>
    );
}

export default GradientLogo;
