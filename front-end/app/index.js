import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import tw from "../tailwind";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
      <Text style={tw`text-xl font-semibold text-green-600 mb-4`}>
        Welcome to PetGym!
      </Text>
      <TouchableOpacity
        style={tw`flex-row items-center bg-green-500 px-6 py-3 rounded-lg shadow-md`}
        onPress={() => router.push("/login")}
        activeOpacity={0.7}
      >
        <Ionicons name="checkmark-circle" size={24} color="white" style={tw`mr-2`} />
        <Text style={tw`text-white text-lg font-medium`}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}