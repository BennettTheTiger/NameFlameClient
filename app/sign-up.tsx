import { TextInput, Button, View, StyleSheet } from 'react-native';
import { useState } from "react";
import { router } from 'expo-router';
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import useApi from '@/hooks/useApi';

export default function SignUpView() {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [registationSuccess, setRegistrationSuccess] = useState(false);
    const api = useApi();

    async function handleSignUp() {
        api.post('/auth/register', {
            firstName,
            lastName,
            userName,
            email,
            password
        }).then(() => {
            setRegistrationSuccess(true);
        }).catch((err: String) => {
            console.error(err);
        });
    }

    if (registationSuccess) {
        return (
            <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText onPress={() => router.replace('./sign-in')}>User Created go login 🔥</ThemedText>
            </ThemedView>
        )
    }

    return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.core.orange }}>
            <View style={styles.container}>
                <ThemedText type='defaultSemiBold'>Sign Up Page</ThemedText>
                <TextInput placeholder="FirstName" onChangeText={setFirstname} style={styles.inputs} />
                <TextInput placeholder="LastName" onChangeText={setLastname} style={styles.inputs} />
                <TextInput placeholder="Username" onChangeText={setUsername} style={styles.inputs} />
                <TextInput placeholder="Email" onChangeText={setEmail} style={styles.inputs}/>
                <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={styles.inputs}/>
                <TextInput placeholder="ConfirmPassword" secureTextEntry onChangeText={setPasswordConfirm} style={styles.inputs}/>
                <Button title="Sign Up" onPress={handleSignUp} />
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    color: Colors.core.black,
    borderRadius: 10,
    backgroundColor: Colors.core.tan,
    shadowColor: Colors.core.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
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
