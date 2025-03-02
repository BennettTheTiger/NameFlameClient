import { Slot } from 'expo-router';
import { AuthProvider } from '../contexts/authCtx';
import { ActiveNameProvider } from '../contexts/activeNameContext';
import { ErrorProvider } from '@/contexts/errorCtx';
import { ConfirmationProvider } from '@/contexts/confirmationCtx';
import { ErrorModal } from '@/components/ErrorModal';
import { ConfirmationModal } from '@/components/ConfirmationModal';

export default function Root() {
  return (
    <ErrorProvider>
      <ConfirmationProvider>
        <AuthProvider>
          <ActiveNameProvider>
            <ErrorModal />
            <ConfirmationModal />
            <Slot />
          </ActiveNameProvider>
        </AuthProvider>
      </ConfirmationProvider>
    </ErrorProvider>
  );
}
