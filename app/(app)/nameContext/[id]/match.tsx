import {useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import useApi from '@/hooks/useApi';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { NamePopularityGraph } from '@/components/NamePopularityGraph';

export default function NameContextDetailsMatchs() {
  const api = useApi();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [currentName, setCurrentName] = useState<{ name: string; description: string; popularity: {}; gender: 'male' | 'female' }>({ name: '', description: '', popularity: {}, gender: 'male' });

  function searchForName(name: string) {
    setLoading(true);
    api.get(`/name/${name}`).then((resp) => {
      setCurrentName(resp.data);
    }).catch((err) => {
      console.log(err);
    });
    setLoading(false);
  }

  function fetchNewName() {
    api.get('/name/random').then((resp) => {
      setCurrentName(resp.data);
    });
  }

  useEffect(() => {
    fetchNewName();
  }, []);

  function handleLikeName() {
    api.patch(`/nameContext/${id}/match`, {
      name: currentName.name,
    }).then(() => {
      setSearchValue('');
      fetchNewName();
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
          onPress={fetchNewName}
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