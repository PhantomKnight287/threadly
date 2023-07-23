import { WorkSans } from "@/constants/fonts";
import { Text as RNText } from "react-native";
import { TextProps } from "react-native";

export default function Text(props: TextProps) {
  return (
    <RNText
      {...props}
      style={[
        { fontFamily: WorkSans.WorkSans_400Regular, color: "white" },
        props.style,
      ]}
    />
  );
}
