import { useState } from "react";
import { View, Button, Switch, Pressable, ActivityIndicator } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { ThemedView } from '../../../components/ThemedView';
import { ThemedText } from '../../../components/ThemedText';

import { useAuth } from '../../../contexts/authCtx';
import { useConfirmationContext } from '../../../contexts/confirmationCtx';
import useApi from '../../../hooks/useApi';

export default function SettingsView() {
  const { signOutUser } = useAuth();
  const api = useApi();
  const [loading, setLoading] = useState(false);

  const [sendNotifications, setSendNotifications] = useState(true);
  const { requireConfirmation, resolveModal } = useConfirmationContext();

  function handleAccoundDeletion() {
    requireConfirmation({
      message: 'Are you sure you want to delete your account? Deleting your account will remove all of your data including shared name contexts and cannot be undone.',
      primaryActionTitle: 'Delete Account',
      primaryAction: async () => {
        setLoading(true);
        try {
          await api.delete('/user');
          resolveModal();
          signOutUser();
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      }
      });
    }

  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        darkColor={Colors.core.purple}
        lightColor={Colors.core.tan}
      >
        <ActivityIndicator  size='large' color={Colors.core.orange} />
      </ThemedView>
    );
  }

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      darkColor={Colors.core.purple}
      lightColor={Colors.core.tan}
    >
      <View style={{
          backgroundColor: Colors.core.tanLighter,
          padding: 20,
          borderRadius: 10,
      }}>
        <ThemedText style={{textAlign: 'center'}} lightColor={Colors.core.black} darkColor={Colors.core.black} type='defaultSemiBold'>
          Settings
        </ThemedText>
        <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'flex-end', alignContent: 'center' }}>
          <Switch
            ios_backgroundColor={Colors.core.white}
            value={sendNotifications}
            onValueChange={setSendNotifications}
            trackColor={{ false: Colors.core.purple, true: Colors.core.orange }}
          />
          <ThemedText style={{ paddingLeft: 10 }}lightColor={Colors.core.black} darkColor={Colors.core.black} type='default'>
            Send Notifications
          </ThemedText>
        </View>
        <View style={{ paddingTop: 10 }}>
          <Pressable onPress={handleAccoundDeletion}>
            <ThemedText lightColor={Colors.core.black} darkColor={Colors.core.black} type='default'>
              Delete Account
            </ThemedText>
          </Pressable>
        </View>
        <View style={{ paddingTop: 10 }}>
          <Button onPress={signOutUser} title='Sign Out' color={Colors.core.orange}/>
        </View>
      </View>
    </ThemedView>
  );
}
