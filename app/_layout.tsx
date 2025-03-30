import { Slot } from 'expo-router';
import { AuthProvider } from '../contexts/authCtx';
import { ActiveNameProvider } from '../contexts/activeNameContext';
import { ErrorProvider } from '@/contexts/errorCtx';
import { ConfirmationProvider } from '@/contexts/confirmationCtx';
import { ErrorModal } from '@/components/ErrorModal';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { StatusBar } from 'expo-status-bar';
import { InviteContextProvider } from '@/contexts/inviteContext';

export default function Root() {
  return (
    <ErrorProvider>
      <ConfirmationProvider>
        <AuthProvider>
          <ActiveNameProvider>
            <InviteContextProvider>
            <ErrorModal />
            <ConfirmationModal />
            <StatusBar style="dark" />
            <Slot />
            </InviteContextProvider>
          </ActiveNameProvider>
        </AuthProvider>
      </ConfirmationProvider>
    </ErrorProvider>
  );
}
