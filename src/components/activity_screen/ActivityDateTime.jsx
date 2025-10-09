import { Ionicons } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from '../CustomText';

export default function ActivityDateTime({ onChangeDate, onChangeTime }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      onChangeDate?.(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      onChangeTime?.(selectedTime);
    }
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={styles.container}>
          <Ionicons name="calendar" size={30} color="#8C7871" />
          <CustomText style={styles.text}>
            {date.toLocaleDateString()}
          </CustomText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <View style={styles.container}>
          <Ionicons name="time" size={30} color="#8C7871" />
          <CustomText style={styles.text}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </CustomText>
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <RNDateTimePicker value={date} maximumDate={new Date()} onChange={handleDateChange} />
      )}

      {showTimePicker && (
        <RNDateTimePicker value={time} mode="time" onChange={handleTimeChange} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 18,
  }
});
