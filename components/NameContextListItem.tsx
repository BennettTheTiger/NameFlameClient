import { Colors } from '@/constants/Colors';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { NameContextMatch, NameContextUser } from '@/types/NameContext';

type NameContextListItemProps = {
    id: string;
    name: string;
    matches: NameContextMatch[];
    participants: NameContextUser[];
    updatedAt: string;
}

export function NameContextListItem({ id, name, matches, participants, updatedAt }: NameContextListItemProps) {
    const router = useRouter();
    const updatedAtLocalString = new Date(updatedAt).toLocaleString();
  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.itemTitle}>Name:</Text>
            <Text style={styles.itemValue}>{name}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.itemTitle}>Matches:</Text>
            <Text style={styles.itemValue}>{matches.length || 0}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.itemTitle}>Additional Participants:</Text>
            <Text style={styles.itemValue}>{participants.length}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.itemTitle}>Updated:</Text>
            <Text style={styles.itemValue}>{updatedAtLocalString}</Text>
        </View>
        <Button title="View" onPress={() => router.push(`/nameContext/${id}`)} color={Colors.core.purple} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.core.tanLighter,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    },
    itemTitle: {
      fontFamily: 'Bricolage-Grotesque',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
      color: Colors.core.black,
      paddingRight: 5
    },
    itemValue: {
        fontFamily: 'Bricolage-Grotesque',
        fontSize: 16,
        lineHeight: 24,
        color: Colors.core.black,
    }
  });