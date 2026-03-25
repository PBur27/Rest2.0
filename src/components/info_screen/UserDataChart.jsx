import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function UserDataChart({ userData, days, fill }) {
  const chartData = days.map((day, index) => {
    return { label: day, value: userData[index] };
  });

  console.log(chartData);

  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={chartData}
        color={fill}
        thickness={2}
        dataPointsColor={fill}
        hideRules={false}
        rulesColor="lightgray"
        initialSpacing={20}
        endSpacing={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {},
});
