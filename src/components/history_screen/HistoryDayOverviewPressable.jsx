import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native'
import { View } from 'react-native-web'
import CustomText from '../CustomText'

export default function HistoryDayOverviewPressable({ data }) {

    const date = `${data.date.getDate()}.${data.date.getMonth()}.${data.date.getFullYear()}`
    const exercises = data.exercises.length
    const meals = data.diet.length
    const sleep = data.sleep.length
    console.log(date)

    return (
        <Pressable style={styles.dayButton}>

            <View style={styles.row}>
                <CustomText style={styles.dayButtonText}>{date}</CustomText>
                <CustomText style={styles.dayButtonText}>Press to Edit</CustomText>
                <Ionicons />
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
        flex: 1,
        backgroundColor: "#8C7871",
        padding: 20,
        borderRadius: 10
    },
    dayButtonText: {
        flex: 1,
        backgroundColor: "#8C7871",
        color: "#FBF1E6"
    },
    row: {
        flexDirection: "row"
    }
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