import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '@/constants/Colors';
import useApi from '@/hooks/useApi';
import { useActiveNameContext } from '@/contexts/activeNameContext';
import { useConfirmationContext } from '@/contexts/confirmationCtx';
import { useErrorContext } from '@/contexts/errorCtx';
import { MaterialIcons } from '@expo/vector-icons';

export default function NameContextDetailsView() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const activeNameContext = useActiveNameContext();
  const { requireConfirmation } = useConfirmationContext();
  const { addApiError } = useErrorContext();
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>({});
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
      activeNameContext.resetContext();
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
      setMaxCharacters('');
      setGenderValue(data.gender);
      setLoading(false);

      activeNameContext.setContext({
        id: data.id,
        name: data.name,
        isOwner: data.isOwner
      })

    }).catch((err) => {
      addApiError(err);
    }).finally(() => {
      setLoading(false);
    });
  }

  function saveNameContext() {
    setLoading(true);
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
      router.push('/nameContext');
    }).catch((err) => {
        if (err.response?.status === 500) {
          addApiError(err);
        }
        else {
          setError(err.response?.data?.error || {});
        }
    }).finally(() => {
      setLoading(false);
    });
  }

  function handleDelete() {
      setLoading(true);
      api.delete(`/nameContext/${id}`).then(() => {
        router.push('/nameContext');
      }).catch((err) => {
        addApiError(err);
      }).finally(() => {
        setLoading(false);
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{...styles.label, textAlign: 'center' }}>Basic Information</Text>
          {isExistingNameContxt &&
            <TouchableOpacity onPress={() => {
              requireConfirmation({
                primaryActionTitle: 'Delete Name Context',
                primaryAction: handleDelete,
                message: 'Are you sure you want to delete this name context?'
              });
            }} style={{ padding: 5, backgroundColor: Colors.core.purple, borderRadius: 5 }}>
              <MaterialIcons name='delete' size={24} color={Colors.core.white} />
            </TouchableOpacity>}
            <TouchableOpacity onPress={saveNameContext} style={{ padding: 5, backgroundColor: Colors.core.orange, borderRadius: 5 }}>
              <MaterialIcons name='save' size={24} color={Colors.core.white} />
            </TouchableOpacity>
          {isExistingNameContxt &&
            <TouchableOpacity onPress={() => router.push(`/nameContext/${id}/match`)} style={{ padding: 5, backgroundColor: Colors.core.orange, borderRadius: 5 }}>
              <MaterialIcons name='local-fire-department' size={24} color={Colors.core.white} />
            </TouchableOpacity>
          }
        </View>
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
        {error.name?.message ? <Text style={styles.errorText}>{error.name?.message}</Text> : null}

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe what this name context is about."
          maxLength={256}
          multiline
          value={descriptionValue}
          onChangeText={setDescriptionValue}
        />
        {error.description?.message ? <Text style={styles.errorText}>{error.description?.message}</Text> : null}

        <Text style={styles.label}>Noun</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe what this name context is."
          maxLength={256}
          value={nounValue}
          onChangeText={setNounValue}
        />
        {error.noun?.message ? <Text style={styles.errorText}>{error.noun?.message}</Text> : null}

        <Text style={styles.label}>Max Characters</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder="Set a max number of characters for the name."
          value={maxCharacters}
          onChangeText={setMaxCharacters}
        />
        {error.maxCharacters?.message ? <Text style={styles.errorText}>{error.maxCharacters?.message}</Text> : null}

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
        {error.gender?.message ? <Text style={styles.errorText}>{error.gender.message}</Text> : null}

        <Text style={styles.label}>Starts with the letter</Text>
        <TextInput
          style={styles.input}
          value={startsWithValue}
          onChangeText={(value)=> setStartsWithValue(String(value).toUpperCase())}
          maxLength={1}
        />
        {error.startsWithLetter?.message ? <Text style={styles.errorText}>{error.startsWithLetter?.message}</Text> : null}
      </View>
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
  errorText: {
    color: Colors.core.orange,
    fontSize: 12,
  },
});