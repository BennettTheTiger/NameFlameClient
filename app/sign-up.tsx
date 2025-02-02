import { Text, TextInput, Button, View } from 'react-native';
import { useState } from "react";
import { router } from 'expo-router';

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
                <Text onPress={() => router.replace('./sign-in')}>User Created go login</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Sign Up Page</Text>
            <TextInput placeholder="Username" onChangeText={setUsername} />
            <TextInput placeholder="Email" onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
}
