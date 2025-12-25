import { FlatList, StyleSheet } from 'react-native';
import HistoryDayOverviewPressable from './HistoryDayOverviewPressable';

export default function HistoryDays({ userData, openModal }) {
    

    const sortedData = [...userData].sort((a, b) => {
        return b.date - a.date;
    });

    return (
        <FlatList
        
        style={styles.container}
            contentContainerStyle={styles.listContainer}
            data={sortedData}
            renderItem={({ item }) => <HistoryDayOverviewPressable data={item} openModal={openModal}/>}
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