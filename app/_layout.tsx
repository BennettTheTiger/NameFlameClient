import { Slot } from 'expo-router';
import { TokenProvider } from '../contexts/authCtx';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <TokenProvider>
      <Slot />
    </TokenProvider>
  );
}
