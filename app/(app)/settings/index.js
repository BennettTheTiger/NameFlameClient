import { Text, View } from 'react-native';

import { useToken } from '../../../contexts/authCtx';

export default function Index() {
  const { signOut } = useToken();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Settings Page, Sign Out
      </Text>
    </View>
  );
}
