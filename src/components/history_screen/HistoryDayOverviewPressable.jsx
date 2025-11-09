import { Pressable, StyleSheet, View } from 'react-native'
import CustomText from '../CustomText'

export default function HistoryDayOverviewPressable({ data, openModal }) {
    const date = `${data.date.getDate()}.${data.date.getMonth() + 1}.${data.date.getFullYear()}`
    const exercises = data.exercises.length
    const meals = data.diet.length
    const sleep = data.sleep.length

    return (
        <Pressable 
            style={styles.dayButton}
            onPress={() => openModal(data)}
        >
            <View style={styles.row}>
                <CustomText style={styles.dayButtonText}>{date}</CustomText>
                <CustomText style={[styles.dayButtonText, { color: "#913737" }]}>Press to Edit</CustomText>
            </View>
            <View style={styles.row}>
                <CustomText style={styles.dayButtonText}>Exercises: {exercises}</CustomText>
                <CustomText style={styles.dayButtonText}>Meals: {meals}</CustomText>
                <CustomText style={styles.dayButtonText}>Sleep: {sleep}</CustomText>
            </View>
        </Pressable>
        
    )
}

const styles = StyleSheet.create({
    dayButton: {
        marginVertical: 5,
        backgroundColor: "#8C7871",
        paddingHorizontal: 10,
        borderRadius: 10,
        gap: 5
    },
    dayButtonText: {
        color: "#FBF1E6",
        backgroundColor: "transparent",
        fontSize: 16
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    },

})


/*
data
: 
date
: 
Tue Oct 28 2025 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy) {}
diet
: 
[]
exercises
: 
[]
sleep
: 
[]
*/