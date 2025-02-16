import { useState } from "react";
import { router } from 'expo-router';
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import { useToken } from '../contexts/authCtx';
import { Colors } from "@/constants/Colors";

export default function SignIn() {
  const { signIn } = useToken();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    if (username && password) {
      signIn(username, password);
    }
  }

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.core.orange }}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.header} >Sign In</ThemedText>
        <TextInput autoComplete="username" placeholder="Username" onChangeText={setUsername} style={styles.inputs} />
        <TextInput autoComplete="password" placeholder="Password" secureTextEntry onChangeText={setPassword} style={styles.inputs} />
        <TouchableOpacity onPress={handleSignIn} disabled={!username || !password} style={styles.buttons}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            // Navigate after signing in. You may want to tweak this to ensure sign-in is
            // successful before navigating.
            router.replace('./sign-up');
          }} style={styles.buttons}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    borderRadius: 10,
    backgroundColor: Colors.core.tan,
    shadowColor: Colors.core.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
  },
  header: {
    color: Colors.core.black,
    textAlign: 'center',
    paddingBottom: 20
  },
  inputs: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.core.tanLighter,
    borderRadius: 5,
  },
  buttons: {
    backgroundColor: Colors.core.purple,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.core.white,
    fontSize: 16,
  },
});
