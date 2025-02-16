import { useToken } from '../../contexts/authCtx';
import { Redirect } from 'expo-router';

export default function SignOutEmptyView() {
    const { signOut } = useToken();
    signOut();
    return <Redirect href="/" />;
}