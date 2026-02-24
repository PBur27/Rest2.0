import { StyleSheet } from "react-native";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

export default function UserDataChart({ userData, days, fill }) {
  const chartData = days.map((day, index) => {
    return { name: day, value: userData[index] };
  });
  console.log(chartData);
  return (
    <LineChart
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: 1.618,
        maxWidth: 600,
      }}
      responsive
      data={chartData}
    >
      <CartesianGrid />
      <XAxis dataKey="name" padding={{ left: 50, right: 0 }} />
      <Line dataKey="value" fill={fill} stroke={fill} />
    </LineChart>
  );
}

const styles = StyleSheet.create({});
