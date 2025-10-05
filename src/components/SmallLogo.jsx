import { StyleSheet, Image } from 'react-native'
import React from 'react'

export default function SmallLogo() {
    return (
        <Image
            style={styles.logo_small}
            source={require("../assets/images/logo.png")}
        />
    )
}

const styles = StyleSheet.create({
    logo_small: {
        width: 60,
        maxHeight: "90%",
        aspectRatio: 1,
        resizeMode: "contain",
    }
})