import { useState } from "react";
import { router } from 'expo-router';
import { Text, Button, TextInput, View } from 'react-native';

import { useToken } from '../contexts/authCtx';

export default function SignIn() {
  const { signIn } = useToken();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    if (username && password) {
      signIn(username, password);
      router.replace('./(app)/nameContext');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign In</Text>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Sign In" onPress={handleSignIn} />

      <Text
        onPress={() => {
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('./sign-up');
        }}>
        Sign Up
      </Text>
    </View>
  );
}
