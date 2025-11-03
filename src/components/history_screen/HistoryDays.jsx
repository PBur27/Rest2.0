import { FlatList, StyleSheet } from 'react-native'
import HistoryDayOverviewPressable from './HistoryDayOverviewPressable'

export default function HistoryDays({ userData }) {

    return (
        <FlatList
        
        style={styles.container}
            contentContainerStyle={styles.listContainer}
            data={userData}
            renderItem={({ item }) => <HistoryDayOverviewPressable data={item} />}
        />

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%"
    },
    listContainer: {
        alignSelf:"center",
        flex: 1,
        width: "90%",
        justifyContent: "space-evenly"
    }
})