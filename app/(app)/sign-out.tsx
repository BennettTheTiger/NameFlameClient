import { useAuth } from '../../contexts/authCtx';

export default function SignOutEmptyView() {
    const { signOutUser } = useAuth();
    signOutUser();
}