import { TextInput, Button, View, StyleSheet } from 'react-native';
import { useState } from "react";
import { router } from 'expo-router';
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

export default function SignUpView() {
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registationSuccess, setRegistrationSuccess] = useState(false);

    async function handleSignUp() {
        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                alert('User registered successfully!');
                setRegistrationSuccess(true);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    }

    if (registationSuccess) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText onPress={() => router.replace('./sign-in')}>User Created go login 🔥</ThemedText>
            </View>
        )
    }

    return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.core.orange }}>
            <View style={styles.container}>
                <ThemedText style={styles.header}>Sign Up Page</ThemedText>
                <TextInput placeholder="Username" onChangeText={setUsername} style={styles.inputs} />
                <TextInput placeholder="Email" onChangeText={setEmail} style={styles.inputs}/>
                <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={styles.inputs}/>
                <Button title="Sign Up" onPress={handleSignUp} />
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
