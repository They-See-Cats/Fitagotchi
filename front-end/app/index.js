import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import tw from "../tailwind";

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Gym Pet</Text>
      <Text style={tw`text-green-500`}>Welcome to PetGym!</Text>
      <Button title="" onPress={() => router.push("/login")} />
    </View>
  );
}