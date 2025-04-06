import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import useApi from '@/hooks/useApi';
import { useErrorContext } from '@/contexts/errorCtx';
import { useActiveNameContext } from '@/contexts/activeNameContext';
import { useInviteContext } from '@/contexts/inviteContext';

type AddParticipantBarProps = {
    isOwner: boolean;
}

function AddParticipantBar(props: AddParticipantBarProps) {
    const api = useApi();
    const { addApiError } = useErrorContext();
    const { id, setContext } = useActiveNameContext();
    const [participantEmail, setParticipantEmail] = useState('');
    const { setInviteContext, resetInviteContext } = useInviteContext();

    // Prevent adding participants if not the owner or if the context is new
    if (id === 'add' || !props.isOwner) {
      return null;
    }

    function getNameContext() {
        api.get(`/nameContext/${id}`).then((resp) => {
            setContext({
                participants: resp.data?.participants || [],
            });
        }).catch((err) => addApiError(err));
    }

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

    function handleAddParticipant() {
        if (participantEmail) {
            api.post(`/nameContext/${id}/participant`, { email: participantEmail })
            .then((resp) => {
                setParticipantEmail('');
                if (resp.status === 201 && resp.data?.type === 'invite') {
                    getInvites();
                }
                if (resp.status === 201 && resp.data?.type === 'user') {
                    getNameContext();
                }
            }).catch((err) => addApiError(err));
        }
    }
    return (
        <View style={{ flexDirection: 'row' }}>
        <TextInput
            style={{
                backgroundColor: Colors.core.white,
                padding: 5,
                fontFamily: 'Bricolage-Grotesque',
                borderRadius: 5, flexGrow: 1
            }}
            placeholder="Invite participants by email"
            autoComplete='email'
            keyboardType='email-address'
            value={participantEmail}
            onChangeText={setParticipantEmail}
        />
        <TouchableOpacity onPress={handleAddParticipant} style={{ padding: 5, backgroundColor: Colors.core.orange, borderRadius: 5, marginLeft: 5 }}>
            <MaterialIcons name="add" size={24} color={Colors.core.white} />
        </TouchableOpacity>
        </View>
    )
  }

  export default AddParticipantBar;