import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '@/constants/Colors';
import useApi from '@/hooks/useApi';

export default function NameContextDetailsView() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const api = useApi();
  const [loading, setLoading] = useState(true);
  // form values
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [nounValue, setNounValue] = useState('');
  const [maxCharacters, setMaxCharacters] = useState('');
  const [genderValue, setGenderValue] = useState('neutral');
  const [startsWithValue, setStartsWithValue] = useState('');
  const [participants, setParticipants] = useState([]);

  const isExistingNameContxt = id !== 'new';

  function resetForm() {
    setNameValue('');
    setDescriptionValue('');
    setNounValue('');
    setMaxCharacters('');
    setGenderValue('neutral');
    setStartsWithValue('');
    setParticipants([]);
  }

  useEffect(() => {
    if (isExistingNameContxt) {
      fetchNameContext();
    }
    else {
      resetForm();
      setLoading(false);
    }
  }, [id]);

  function fetchNameContext() {
    setLoading(true);

    api.get(`/nameContext/${id}`).then((resp) => {
      const data = resp.data;
      setNameValue(data.name);
      setDescriptionValue(data.description);
      setNounValue(data.noun);
      setMaxCharacters(data.filter.maxCharacters);
      setGenderValue(data.gender);
      setLoading(false);
    }).catch((err) => {
      alert(err);
      setLoading(false);
    });
  }

  function saveNameContext() {
    api.post('/nameContext', {
      name: nameValue,
      description: descriptionValue,
      noun: nounValue,
      filter: {
        gender: genderValue,
        maxCharacters,
        startsWithLetter: startsWithValue
      },
      participants
    }).then(() => {
      alert('Name context created');
    }).catch((err) => {
      console.log(err);
      alert('Failed to create name context');
    });
  }

  if (loading) {
    return <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={Colors.core.orange} />
    </ThemedView>
  }

  return (
    <ThemedView style={{ flex: 1, alignItems: 'center'}}>
      <View style={styles.container}>
        <Text style={{...styles.label, textAlign: 'center' }}>Basic Information</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder='How will you identify this name context?'
          maxLength={126}
          readOnly={isExistingNameContxt}
          autoCapitalize='words'
          value={nameValue}
          onChangeText={setNameValue}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe what this name context is about."
          maxLength={256}
          multiline
          value={descriptionValue}
          onChangeText={setDescriptionValue}
        />

        <Text style={styles.label}>Noun</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe what this name context is."
          maxLength={256}
          value={nounValue}
          onChangeText={setNounValue}
        />

        <Text style={styles.label}>Max Characters</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder="Set a max number of characters for the name."
          value={maxCharacters}
          onChangeText={setMaxCharacters}
        />

        <Text style={styles.label}>Gender</Text>
        <Dropdown
          style={styles.input}
          data={[
            { label: 'Neutral', value: 'neutral' },
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' }
          ]}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={genderValue}
          onChange={item => {
            setGenderValue(item.value);
          }}
        />

        <Text style={styles.label}>Starts with the letter</Text>
        <TextInput
          style={styles.input}
          value={startsWithValue}
          onChangeText={(value)=> setStartsWithValue(String(value).toUpperCase())}
          maxLength={1}
        />
      </View>
      <TouchableOpacity style={styles.buttons} onPress={saveNameContext}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

/*     // Participants
<View style={styles.container}>
  <Text style={{...styles.label, textAlign: 'center' }}>Participants</Text>
  <Dropdown
    style={styles.input}
    // placeholderStyle={styles.placeholderStyle}
    // selectedTextStyle={styles.selectedTextStyle}
    // inputSearchStyle={styles.inputSearchStyle}
    // iconStyle={styles.iconStyle}
    data={[]}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
    searchPlaceholder="Search..."
    value={participants}
    onChange={item => {
      setParticipants(item.value);
    }}
  />
</View>
*/

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 20,
    width: '90%',
    color: Colors.core.black,
    borderRadius: 10,
    backgroundColor: Colors.core.tan,
    shadowColor: Colors.core.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
  },
  label: {
    fontFamily: 'Bricolage-Grotesque',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10
  },
  input: {
    backgroundColor: Colors.core.white,
    padding: 5,
    fontFamily: 'Bricolage-Grotesque',
    borderRadius: 5,
  },
  buttons: {
    backgroundColor: Colors.core.orange,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: '90%'
  },
  buttonText: {
    color: Colors.core.white,
    fontSize: 16,
  },
});