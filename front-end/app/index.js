import { View, Text, TouchableOpacity , Image} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import tw from "../tailwind";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-900 p-6 gap-9`}> 
      {/* 🔥 Changed background from bg-white to bg-gray-900 (Dark mode fix) */}
      <Image source={require('../assets/fitagotchitrans.png')} style={tw`w-[350px] h-[300px]`}/>
      <Text style={tw`text-xl font-semibold text-[#549929] mb-4 text-center`}>
        This is where we put the elevator pitch or catchphrase!
      </Text>

      <TouchableOpacity
        style={tw`flex-row items-center bg-[#549929] px-6 py-3 rounded-lg shadow-md`}
        onPress={() => router.push("/login")}
        activeOpacity={0.7}
      >
        <Ionicons name="checkmark-circle" size={24} color="white" style={tw`mr-2`} />
        <Text style={tw`text-white text-lg font-medium`}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
