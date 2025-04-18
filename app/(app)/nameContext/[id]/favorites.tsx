import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { useActiveNameContext,  } from '@/contexts/activeNameContext';
import { MaterialIcons } from '@expo/vector-icons';
import useApi from '@/hooks/useApi';
import { useErrorContext } from '@/contexts/errorCtx';

function Favorites() {
    const router = useRouter();
    const api = useApi();
    const activeNameContext = useActiveNameContext();
    const { addApiError } = useErrorContext();

    const [loading, setLoading] = useState(false);

    function removeLikedName(name: string) {
        api.patch(`/nameContext/${activeNameContext.id}/removeNames`, {
            names: [name]
        }).then((resp) => activeNameContext.setContext(resp.data))
        .catch((err) => addApiError(err))
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

        const { likedNames } = activeNameContext;

        if (likedNames.length === 0) {
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
                {likedNames.map((name, index) => (
                    <View key={name}>
                        <View style={{ backgroundColor: Colors.core.tan, height: 2 }} key={name}/>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 5, paddingBottom: 5 }}>
                            <ThemedText type='defaultSemiBold' darkColor={Colors.core.black} style={{ }}>{index + 1}. {name}</ThemedText>
                            <Pressable onPress={() => removeLikedName(name)}>
                                <MaterialIcons name='delete' size={24} color={Colors.core.orange} />
                            </Pressable>
                        </View>
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