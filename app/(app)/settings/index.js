import { useState, useEffect } from "react";
import { View, Button, Switch } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { ThemedView } from '../../../components/ThemedView';
import { ThemedText } from '../../../components/ThemedText';

import { useToken } from '../../../contexts/authCtx';

export default function SettingsView() {
  const { signOut } = useToken();

  const [sendNotifications, setSendNotifications] = useState(true);

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
          <Button title="Delete Account" color={Colors.core.black}/>
        </View>
        <View style={{ paddingTop: 10 }}>
          <Button onPress={signOut} title='Sign Out' color={Colors.core.orange}/>
        </View>
      </View>
    </ThemedView>
  );
}
