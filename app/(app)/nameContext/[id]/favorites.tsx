import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { useActiveNameContext } from '@/contexts/activeNameContext';
import { MaterialIcons } from '@expo/vector-icons';
import useApi from '@/hooks/useApi';

function Favorites() {
    const router = useRouter();
    const api = useApi();
    const activeNameContext = useActiveNameContext();

    const [nameContextData, setNameContextData] = useState<string[]>(activeNameContext.likedNames);
    const [loading, setLoading] = useState(false);

    function removeLikedName(name: string) {
        setLoading(true);
        api.delete(`/nameContext/${activeNameContext.id}/match`, {
            data: {
                name
            }
        }).then(() => {
            // fetchLikedNames();
        }).finally(() => {
            setLoading(false);
        });
    }

    function renderContent() {
        if (loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color={Colors.core.orange} />
                    </View>
                </View>
            );
        }

        if (nameContextData.length === 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ThemedText type='subtitle' darkColor={Colors.core.black}>No Favorites yet!</ThemedText>
                    <Pressable style={styles.matchBtn} onPress={() => router.replace(`/nameContext/${activeNameContext.id}/match`)}>
                        <Text style={styles.matchBtnText}>Start Matching</Text>
                        <MaterialIcons name='local-fire-department' size={24} color={Colors.core.tanLighter} />
                    </Pressable>
                </View>
            )
        }

        return (
            <View style={{ padding: 10, borderRadius: 10 }}>
                {nameContextData.map((name, index) => (
                    <View key={index} style={{ paddingBottom: 10 }}>
                        <View style={{ backgroundColor: Colors.core.tan, height: 2 }} key={index}/>
                        <ThemedText type='defaultSemiBold' darkColor={Colors.core.black} style={{ paddingTop: 10 }}>{index + 1}. {name}</ThemedText>
                    </View>
                ))}
            </View>
        );
    }

    return (
        <ThemedView style={{ flex: 1, alignItems: 'center', padding: 10 }}>
            <View style={styles.container}>
                <ThemedText style={{textAlign: 'center'}} type='subtitle' darkColor={Colors.core.black} >Favorites</ThemedText>
                {renderContent()}
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: Colors.core.tanLighter,
        borderRadius: 10,
        marginTop: 10,
    },
    matchBtn: {
        backgroundColor: Colors.core.orange,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        maxWidth: 300,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    matchBtnText: {
        color: Colors.core.tanLighter,
        fontSize: 16,
        fontFamily: 'Bricolage-Grotesque'
    }
});

export default Favorites;