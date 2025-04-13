import { useState } from "react";
import { router } from 'expo-router';
import { TextInput, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import { useAuth } from '../contexts/authCtx';
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function SignIn() {
  const { signIn, user } = useAuth();

  if (user) {
    // Redirect to the home page if the user is already signed in.
    router.replace('/');
  }

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleResetPassword() {
    setIsLoading(true);
    setErrorMsg('');
    if (!email) {
      setErrorMsg('Please enter your email address');
      setIsLoading(false);
      return;
    }
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      setErrorMsg('Invalid Credentials, please try again');
    }
    setIsLoading(false);
  }

  async function handleSignIn() {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await signIn(email, password);
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
          autoComplete="email"
          placeholder="Email"
          placeholderTextColor={Colors.core.black}
          onChangeText={setEmail}
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
        <TouchableOpacity onPress={handleSignIn} disabled={!email || !password} style={styles.buttons}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.replace('./sign-up') }} style={styles.buttons}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleResetPassword} style={styles.passwordReset}>
          <Text style={{ ...styles.buttonText, color: Colors.core.black }}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.core.orange }}>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <MaterialIcons name="local-fire-department" size={100} color={Colors.core.orange} />
          <ThemedText type="title" style={styles.header}>Sign In</ThemedText>
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
  passwordReset: {
    backgroundColor: Colors.core.tan,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  }
});
