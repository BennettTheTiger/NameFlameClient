import { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import useApi from '@/hooks/useApi';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { useConfirmationContext } from '@/contexts/confirmationCtx';
import { NamePopularityGraph } from '@/components/NamePopularityGraph';
import { useErrorContext } from '@/contexts/errorCtx';
import { useActiveNameContext } from '@/contexts/activeNameContext';


type NameItem = {
  name: string;
  description: string;
  popularity: any;
  gender: 'male' | 'female' | 'neutral'
};

export default function NameContextDetailsMatchs() {
  const api = useApi();

  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { requireConfirmation } = useConfirmationContext();
  const [isLoading, setLoading] = useState(false);
  const { addApiError } = useErrorContext();
  const { setContext } = useActiveNameContext();

  const [searchValue, setSearchValue] = useState('');
  const [names, setNames] = useState<NameItem[]>([]);
  const [currentName, setCurrentName] = useState<NameItem>({ name: '', description: '', popularity: {}, gender: 'neutral' });

  function searchForName(name: string) {
    setLoading(true);
    api.get(`/name/${name}`, ).then((resp) => {
      setCurrentName(resp.data);
    }).catch((err) => {
     addApiError(err);
    });
    setLoading(false);
  }

  function fetchNames() {
    setLoading(true);
    api.get(`/nameContext/${id}/nextNames`, {
      params: {
        limit: 25,
      }
    }).then((resp) => {
      if (resp.data.length === 0) {
        requireConfirmation({
          message: 'No more names to match! Check the filters to see if there are more names to match.',
          primaryActionTitle: 'Return to Name Context',
          primaryAction: () => router.replace(`/nameContext/${id}`),
        });
        return;
      }
      setCurrentName(resp.data[0]);
      setNames(resp.data.slice(1));
    }).catch((err) => {
      addApiError(err);
    }).finally(() => {
      setLoading(false);
    });
  }

  function nextName() {
    if (names.length > 1) {
      const newName = names.shift();
      if (newName) {
        setCurrentName(newName);
      }
      setNames(names);
    }
    else fetchNames();
  }

  useFocusEffect(useCallback(fetchNames, [id]));

  function handleLikeName() {
    setLoading(true);
    api.patch(`/nameContext/${id}/match`, {
      name: currentName.name,
    }).then((resp) => {
      setSearchValue('');
      setContext(resp.data);
      nextName();
    }).catch((err) => {
      addApiError(err);
    }).finally(() => {
      setLoading(false);
    });
  }

  const disableDislike = searchValue.length > 0;

  return (
    <ThemedView style={{ flex: 1, alignItems: 'center', padding: 10 }}>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          placeholder='Search for a name'
          style={{
            padding: 10,
            borderRadius: 5,
            flex: 1,
            fontFamily: 'Bricolage-Grotesque',
            backgroundColor: Colors.core.white,
          }}
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <TouchableOpacity
          style={{backgroundColor: Colors.core.orange, padding: 7, borderRadius: 5, marginLeft: 10}}
          onPress={() => searchForName(searchValue)}
        >
          <MaterialIcons name="search" size={24} color={Colors.core.white} />
        </TouchableOpacity>
      </View>
      <View style={{
          flex: 1,
          width: '100%',
          backgroundColor: Colors.core.tanLighter ,
          padding: 20,
          borderRadius: 10,
          marginTop: 10,
        }}>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <ThemedText type='title' darkColor={Colors.core.black}>{currentName.name}</ThemedText>
        </View>
        <View style={styles.rowDivider} />
        <ScrollView>
          <View>
            <ThemedText type='subtitle' darkColor={Colors.core.black}>Description:</ThemedText>
            <ThemedText type='default' darkColor={Colors.core.black}>Here is where some info about the name will go</ThemedText>
          </View>
          <View style={styles.rowDivider} />
          <View style={{ flexDirection: 'row' }}>
            <ThemedText type='subtitle' darkColor={Colors.core.black}>Primary Gender:</ThemedText>
            <ThemedText type='default' darkColor={Colors.core.black}>{currentName.gender}</ThemedText>
          </View>
          <View style={styles.rowDivider} />
          <View>
          <ThemedText type='subtitle' darkColor={Colors.core.black}>Popularity:</ThemedText>
          <NamePopularityGraph popularity={currentName.popularity} gender={currentName.gender} />
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        { !disableDislike && <TouchableOpacity
          style={[styles.buttons, { backgroundColor: Colors.core.purple }]}
          onPress={nextName}
        >
          <MaterialIcons name="cancel" size={24} color={Colors.core.white} />
        </TouchableOpacity> }
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: Colors.core.orange }]}
          onPress={handleLikeName}
        >
          <MaterialIcons name="favorite" size={24} color={Colors.core.white} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  rowDivider: {
    height: 2,
    backgroundColor: Colors.core.tan,
    borderRadius: 2,
    marginVertical: 10,
  },
  buttons: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 5, // Add some horizontal margin to create space between buttons
  }
});