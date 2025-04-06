import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useActiveNameContext } from '@/contexts/activeNameContext';
import { useConfirmationContext } from '@/contexts/confirmationCtx';
import { useErrorContext } from '@/contexts/errorCtx';
import { Colors } from '@/constants/Colors';
import useApi from '@/hooks/useApi';
import { MaterialIcons } from '@expo/vector-icons';

type NameContextMenuProps = {
  saveNameContext: () => void;
  updateNameContext: () => void;
  setLoading: (loading: boolean) => void;
  isExistingNameContxt: boolean;
  isOwner: boolean;
}

const iconSize = 24;
const iconColor = Colors.core.white;

function NameContextMenu(nameContextMenuProps: NameContextMenuProps) {
    const router = useRouter();
    const { requireConfirmation } = useConfirmationContext();
    const api = useApi();
    const { addApiError } = useErrorContext();

    function handleDelete() {
        nameContextMenuProps.setLoading(true);
        api.delete(`/nameContext/${id}`).then(() => {
          router.push('/nameContext');
        }).catch((err) => {
          addApiError(err);
        }).finally(() => {
          nameContextMenuProps.setLoading(false);
        });
    }

    const { id } = useActiveNameContext();
    const nameOptions = [];
    const isNewNameContext = id === '';

    if (nameContextMenuProps.isOwner) {
        nameOptions.push(
          <TouchableOpacity
            style={{...styles.navBtn, backgroundColor: Colors.core.purple}}
            onPress={() => {
              requireConfirmation({
                primaryActionTitle: 'Delete Name Context',
                primaryAction: handleDelete,
                message: 'Are you sure you want to delete this name context?'
              });
            }}
          >
            <MaterialIcons name='delete' size={iconSize} color={iconColor} />
          </TouchableOpacity>
        );
        nameOptions.push(
            <TouchableOpacity onPress={() => router.push(`/nameContext/${id}/participants`)} style={styles.navBtn}>
                <MaterialIcons name='people' size={iconSize} color={iconColor} />
            </TouchableOpacity>
        );
    }

    if (nameContextMenuProps.isOwner || isNewNameContext) {
        nameOptions.push(
            <TouchableOpacity onPress={isNewNameContext ? nameContextMenuProps.saveNameContext : nameContextMenuProps.updateNameContext} style={styles.navBtn}>
                <MaterialIcons name='save' size={iconSize} color={iconColor} />
            </TouchableOpacity>
        );
    }

    if (!isNewNameContext) {
        nameOptions.push(
            <TouchableOpacity onPress={() => router.push(`/nameContext/${id}/favorites`)} style={styles.navBtn}>
                <MaterialIcons name='star' size={iconSize} color={iconColor} />
            </TouchableOpacity>
        );

        nameOptions.push(
            <TouchableOpacity onPress={() => router.push(`/nameContext/${id}/match`)} style={styles.navBtn}>
                <MaterialIcons name='local-fire-department' size={iconSize} color={iconColor} />
            </TouchableOpacity>
        );
    }

    return <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        {nameOptions.map((option, index) => (
            <View key={index}>
                {option}
            </View>
        ))}
    </View>
}

const styles = StyleSheet.create({
    navBtn: {
        padding: 5,
        backgroundColor: Colors.core.orange,
        borderRadius: 5
    },
});

export default NameContextMenu;