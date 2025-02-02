import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Page Not Found</Text>
      <Button title="Go Home" onPress={() => router.replace("/")} />
    </View>
  );
}