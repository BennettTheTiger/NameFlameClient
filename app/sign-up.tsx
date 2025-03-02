import { TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useState } from "react";
import { router } from 'expo-router';
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import useApi from '@/hooks/useApi';
import { useErrorContext } from '@/contexts/errorCtx';
import { useConfirmationContext } from '@/contexts/confirmationCtx';

export default function SignUpView() {
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const api = useApi();
    const { addApiError } = useErrorContext();
    const { requireConfirmation } = useConfirmationContext();

    async function handleSignUp() {
        api.post('/auth/register', {
            userName,
            email,
            password
        }).then(() => {
            requireConfirmation({
                message: 'User Created successfully 🔥',
                primaryActionTitle: 'Go to Sign In',
                primaryAction: () => router.replace('./sign-in')
            });
        }).catch((err) => {
            addApiError(err);
        });
    }

    function renderContent() {
        if (isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.core.orange }}>
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color={Colors.core.orange} />
                    </View>
                </View>
            );
        }

        return  (
            <View>
                <TextInput placeholder="Username" onChangeText={setEmail} style={styles.inputs}/>
                <TextInput placeholder="Email" onChangeText={setEmail} style={styles.inputs}/>
                <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={styles.inputs}/>
                <TextInput placeholder="ConfirmPassword" secureTextEntry onChangeText={setPasswordConfirm} style={styles.inputs}/>
                <TouchableOpacity onPress={handleSignUp}>
                    <ThemedText style={styles.buttons}>Sign Up</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace('./sign-in')}>
                    <ThemedText style={styles.buttons}>Go to Sign In</ThemedText>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.core.orange }}>
            <View style={styles.container}>
                <ThemedText type='title' style={{color: Colors.core.black, textAlign: 'center', paddingBottom: 10}}>Sign Up</ThemedText>
                {renderContent()}
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    minWidth: 300,
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
    fontFamily: 'Bricolage-Grotesque',
  },
  buttons: {
    backgroundColor: Colors.core.purple,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonText: {
    color: Colors.core.white,
    fontSize: 16,
    fontFamily: 'Bricolage-Grotesque',
  },
});
