import { ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Colors } from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { useToken } from '../../contexts/authCtx';
import { ThemedView } from '@/components/ThemedView';

export default function AppLayout() {
  const { token, isLoading } = useToken();

  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={Colors.core.orange} />
    </ThemedView>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="../sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: Colors.core.tanLighter, // Change drawer background color
          },
          drawerActiveTintColor: Colors.core.orange, // Change active item color
          drawerInactiveTintColor: Colors.core.black, // Change inactive item color
        }}
        >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerItemStyle: { display: 'none' }, // Hide from drawer navigation
          }}
        />
        <Drawer.Screen
          name="nameContext/[id]/matches" // This is the name of the page and must match the url from root
          options={{
            headerTitle: 'Name Context Matches',
            drawerItemStyle: { display: 'none' }, // Hide from drawer navigation
          }}
          />
        <Drawer.Screen
          name="nameContext/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Name Contexts',
            headerTitle: 'Name Contexts',
            headerStyle: {
              backgroundColor: Colors.core.tan, // Set header background color
            },
            headerRight: () => (
              <MaterialIcons
                name="add"
                size={24}
                aria-label='Add Name Context'
                color={Colors.core.orange}
                onPress={() => router.push('./nameContext/new')}
                style={{ marginRight: 10 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="nameContext/[id]" // This is the name of the page and must match the url from root
          options={{
            headerTitle: 'Name Context Details',
            headerStyle: {
              backgroundColor: Colors.core.tan, // Set header background color
            },
            drawerItemStyle: { display: 'none' }, // Hide from drawer navigation
            headerLeft: () => (
              <MaterialIcons
                name="arrow-back"
                size={24}
                aria-label='Back'
                color={Colors.core.orange}
                onPress={() => router.back()}
                style={{ marginLeft: 10 }}
              />
            ),
            headerRight: () => (
              id === 'new'
              ? null
              : (
                <MaterialIcons
                  name="delete"
                  size={24}
                  aria-label='Add Name Context'
                  color={Colors.core.orange}
                  onPress={() => alert('Delete')}
                  style={{ marginRight: 10 }}
                />)
            ),
          }}
        />
        <Drawer.Screen
          name="settings/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Settings',
            headerTitle: 'Settings',
            headerStyle: {
              backgroundColor: Colors.core.tan, // Set header background color
            },
          }}
        />
        <Drawer.Screen
          name="sign-out" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Sign Out',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );

}
