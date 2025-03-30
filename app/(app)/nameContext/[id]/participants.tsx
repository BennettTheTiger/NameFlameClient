import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { useActiveNameContext,  } from '@/contexts/activeNameContext';
import { MaterialIcons } from '@expo/vector-icons';
import InvitesList from '@/components/InvitesList';
import AddParticipantBar from '@/components/AddParticipantsBar';
import { ScrollView } from 'react-native-gesture-handler';

function Participants() {
    const activeNameContext = useActiveNameContext();
    const { participants } = activeNameContext;

    function renderContent() {
        return (
            <View style={{ padding: 10, borderRadius: 10 }}>
                {participants.map((participant, index) => (
                    <View key={participant.id}>
                        <View style={{ backgroundColor: Colors.core.tan, height: 2 }}/>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 5, paddingBottom: 5 }}>
                            <ThemedText type='defaultSemiBold' darkColor={Colors.core.black} style={{ }}>{index + 1}. {participant.name} {participant.email}</ThemedText>
                            <Pressable onPress={() => {}}>
                                <MaterialIcons name='delete' size={24} color={Colors.core.orange} />
                            </Pressable>
                        </View>
                    </View>
                ))}
                <View style={{ backgroundColor: Colors.core.tan, height: 2, marginBottom: 10 }}/>
                <ThemedText style={{textAlign: 'center', marginBottom: 10 }} type='subtitle' darkColor={Colors.core.black}>Invites</ThemedText>
                <AddParticipantBar />
                <InvitesList />
            </View>
        );
    }

    return (
        <ThemedView style={{ flex: 1, alignItems: 'center', padding: 10 }}>
            <ScrollView style={styles.container}>
                <ThemedText style={{textAlign: 'center'}} type='subtitle' darkColor={Colors.core.black}>Participants</ThemedText>
                {renderContent()}
            </ScrollView>
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

export default Participants;