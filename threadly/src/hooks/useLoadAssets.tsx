import {
    WorkSans_100Thin,
    WorkSans_100Thin_Italic,
    WorkSans_200ExtraLight,
    WorkSans_200ExtraLight_Italic,
    WorkSans_300Light,
    WorkSans_300Light_Italic,
    WorkSans_400Regular,
    WorkSans_400Regular_Italic,
    WorkSans_500Medium,
    WorkSans_500Medium_Italic,
    WorkSans_600SemiBold,
    WorkSans_600SemiBold_Italic,
    WorkSans_700Bold,
    WorkSans_700Bold_Italic,
    WorkSans_800ExtraBold,
    WorkSans_800ExtraBold_Italic,
    WorkSans_900Black,
    WorkSans_900Black_Italic,
    useFonts,
} from '@expo-google-fonts/work-sans';

export default function useLoadedAssets() {
    const [loaded] = useFonts({
        WorkSans_100Thin,
        WorkSans_100Thin_Italic,
        WorkSans_200ExtraLight,
        WorkSans_200ExtraLight_Italic,
        WorkSans_300Light,
        WorkSans_300Light_Italic,
        WorkSans_400Regular,
        WorkSans_400Regular_Italic,
        WorkSans_500Medium,
        WorkSans_500Medium_Italic,
        WorkSans_600SemiBold,
        WorkSans_600SemiBold_Italic,
        WorkSans_700Bold,
        WorkSans_700Bold_Italic,
        WorkSans_800ExtraBold,
        WorkSans_800ExtraBold_Italic,
        WorkSans_900Black,
        WorkSans_900Black_Italic,
    });
    return loaded;
}
