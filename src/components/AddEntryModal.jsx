import { StyleSheet, Text, View, Modal, Button, TouchableOpacity } from 'react-native'

import React from 'react'
import CustomText from './CustomText'

export default function AddEntryModal({ isVisible, onClose }) {
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPressOut={onClose} // close on background press
            >
                <View style={styles.modalContent}>
                    <View style={styles.container}>
                        <CustomText style={styles.title}>ADD ENTRY</CustomText>

                

                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <CustomText style={styles.save}>SAVE</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#FBF1E6",
        height: "60%",
        width: "90%",
        borderRadius: 10,
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
    },
    title: {
        textAlign: "center",
        fontSize: 32,
        color: "#5B4B45",
    },
    save: {
        textAlign: "center",
        fontSize: 24,
        color: "#FBF1E6",
        backgroundColor: "transparent",
    },
    closeButton: {
        backgroundColor: "#5B4B45",
        justifyContent: "center",
        width: "80%",
        height: 50,
        borderRadius: 10,
    },
})