import { useState } from "react";
import { router } from 'expo-router';
import { TextInput, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import { useAuth } from '../contexts/authCtx';
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function SignIn() {
  const { signIn, user } = useAuth();

  if (user) {
    // Redirect to the home page if the user is already signed in.
    router.replace('/');
  }

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSignIn() {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await signIn(username, password);
    } catch (e) {
      setErrorMsg('Invalid Credentials, please try again');
    }
    setIsLoading(false);
  }

  function renderContents() {
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.core.orange }}>
          <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.core.orange} />
          </View>
        </View>
      );
    }

    return (
      <View>
        <TextInput
          autoComplete="username"
          placeholder="Username"
          placeholderTextColor={Colors.core.black}
          onChangeText={setUsername}
          style={styles.inputs}
        />
        <TextInput
          autoComplete="password"
          placeholder="Password"
          placeholderTextColor={Colors.core.black}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.inputs}
        />
        { errorMsg ? <Text style={{ color: Colors.core.orange, textAlign: 'center' }}>{errorMsg}</Text> : null }
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
    )
  }

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.core.orange }}>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <MaterialIcons name="local-fire-department" size={100} color={Colors.core.orange} />
          <ThemedText type="title" style={styles.header} >Sign In</ThemedText>
        </View>
        {renderContents()}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    minWidth: 300,
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
    fontFamily: 'Bricolage-Grotesque',
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
    fontFamily: 'Bricolage-Grotesque',
  },
});
