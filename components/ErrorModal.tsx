import { Modal, StyleSheet, View, Text, Pressable } from "react-native";
import { useErrorContext } from "../contexts/errorCtx";
import { BlurView } from 'expo-blur';
import { Colors } from "../constants/Colors";

export function ErrorModal() {
    const { apiErrors, clearApiErrors, hasErrors } = useErrorContext();

    if (!hasErrors) {
        return
    }

    const error = apiErrors[0];
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={hasErrors}
        >
            <BlurView style={errorModalStyles.centeredView} intensity={25}>
                <View style={errorModalStyles.modalView}>
                    <Text style={errorModalStyles.modalText}>{error.message}</Text>
                    <Pressable
                        style={[errorModalStyles.button, errorModalStyles.buttonClose]}
                        onPress={clearApiErrors}>
                        <Text style={errorModalStyles.textStyle}>Ok</Text>
                    </Pressable>
                </View>
            </BlurView>
        </Modal>
    );
}


const errorModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  buttonClose: {
    backgroundColor: Colors.core.orange,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});