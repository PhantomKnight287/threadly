import View from "@/components/shared/view";
import useSetOptions from "@/hooks/useSetOptions";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import Text from "@/components/shared/text";

function Register() {
  useSetOptions({
    headerShown: true,
    headerTitle: "",
  });
  return (
    <View className="flex-1">
      <View className="my-auto items-center justify-center">
        <Octicons name="mention" size={40} color="white" />
      </View>
    </View>
  );
}

export default Register;
