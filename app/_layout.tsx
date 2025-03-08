import { Slot } from 'expo-router';
import { AuthProvider } from '../contexts/authCtx';
import { ActiveNameProvider } from '../contexts/activeNameContext';
import { ErrorProvider } from '@/contexts/errorCtx';
import { ConfirmationProvider } from '@/contexts/confirmationCtx';
import { ErrorModal } from '@/components/ErrorModal';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { StatusBar } from 'expo-status-bar';

export default function Root() {
  return (
    <ErrorProvider>
      <ConfirmationProvider>
        <AuthProvider>
          <ActiveNameProvider>
            <ErrorModal />
            <ConfirmationModal />
            <StatusBar style="dark" />
            <Slot />
          </ActiveNameProvider>
        </AuthProvider>
      </ConfirmationProvider>
    </ErrorProvider>
  );
}
