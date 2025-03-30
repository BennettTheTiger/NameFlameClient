import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import useApi from '@/hooks/useApi';
import { useLocalSearchParams } from 'expo-router';
import { useErrorContext } from '@/contexts/errorCtx';
import { MaterialIcons } from '@expo/vector-icons';
import { Invite, useInviteContext } from '@/contexts/inviteContext';

function InvitesList() {
    const api = useApi();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { addApiError } = useErrorContext();
    const { invites, setInviteContext, resetInviteContext } = useInviteContext();

    function getInvites() {
        api.get(`/nameContext/${id}/invites`).then((resp) => {
            setInviteContext({
                invites: resp.data,
                nameContextId: id,
            })
        }).catch((err) => {
            addApiError(err);
            resetInviteContext();
        });
    }

    React.useEffect(() => {
        getInvites();
    }, [id]);

    if (invites.length === 0) {
        return <Text style={{ textAlign: 'center', padding: 10 }}>No pending invites</Text>
    }
    return invites.map((invite: Invite) => {
        return (
        <View key={invite.id} style={{
            padding: 5,
            backgroundColor: Colors.core.tan,
            borderRadius: 5,
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <View>
                <Text style={{ color: Colors.core.black }}>Invite:</Text>
                <Text style={{ color: Colors.core.black }}>{invite.email}</Text>
            </View>
            <View>
                <Text style={{ color: Colors.core.black }}>Expires:</Text>
                <Text style={{ color: Colors.core.black }}>{new Date(invite.expiresAt).toLocaleString()}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                api.delete(`/nameContext/${id}/invite/${invite.id}`).then(() => {
                    getInvites();
                }).catch((err) => {
                    addApiError(err);
                });
            }}>
                <MaterialIcons name='delete' size={24} color={Colors.core.orange} />
            </TouchableOpacity>
        </View>
        )
    })
}

export default InvitesList;