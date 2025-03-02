import { Modal, StyleSheet, View, Text, Pressable } from "react-native";
import { useConfirmationContext } from "../contexts/confirmationCtx";
import { BlurView } from 'expo-blur';
import { Colors } from "../constants/Colors";

export function ConfirmationModal() {
    const { confirmationModals, requiresConfirmation, resolveModal} = useConfirmationContext();

    if (!requiresConfirmation) {
        return
    }

    const modal = confirmationModals[0];
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={requiresConfirmation}
        >
            <BlurView style={confirmationModalStyles.centeredView} intensity={25}>
                <View style={confirmationModalStyles.modalView}>
                    <Text style={confirmationModalStyles.modalText}>{modal.message}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                        <Pressable
                            style={[confirmationModalStyles.button, { backgroundColor: Colors.core.purple}]}
                            onPress={modal.secondaryAction}>
                            <Text style={confirmationModalStyles.textStyle}>{modal.secondaryActionTitle}</Text>
                        </Pressable>
                        <Pressable
                            style={[confirmationModalStyles.button, { backgroundColor: Colors.core.orange}]}
                            onPress={() => {
                                modal.primaryAction();
                                resolveModal();
                            }}>
                            <Text style={confirmationModalStyles.textStyle}>{modal.primaryActionTitle}</Text>
                        </Pressable>
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
}

const confirmationModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.core.white,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontFamily: 'Bricolage-Grotesque',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'Bricolage-Grotesque',
    marginBottom: 15,
    textAlign: 'center',
  },
});