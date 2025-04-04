import { Slot } from 'expo-router';
import { AuthProvider } from '../contexts/authCtx';
import { ActiveNameProvider } from '../contexts/activeNameContext';
import { ErrorProvider } from '@/contexts/errorCtx';
import { ConfirmationProvider } from '@/contexts/confirmationCtx';
import { ErrorModal } from '@/components/ErrorModal';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { StatusBar } from 'expo-status-bar';
import { InviteContextProvider } from '@/contexts/inviteContext';
import { SystemUserContextProvider } from '@/contexts/systemUserContext';
import { SocketProvider } from '@/contexts/socketContext';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export default function Root() {
  useEffect(() => {
    // Request permissions for notifications
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission for notifications is required!');
      }
    }

    requestPermissions();

    // Configure notification behavior
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);

  return (
    <ErrorProvider>
      <ConfirmationProvider>
        <AuthProvider>
          <SystemUserContextProvider>
            <ActiveNameProvider>
              <SocketProvider>
                <InviteContextProvider>
                <ErrorModal />
                <ConfirmationModal />
                <StatusBar style="dark" />
                <Slot />
                </InviteContextProvider>
              </SocketProvider>
            </ActiveNameProvider>
          </SystemUserContextProvider>
        </AuthProvider>
      </ConfirmationProvider>
    </ErrorProvider>
  );
}
