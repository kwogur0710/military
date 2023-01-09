import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import DatePicker from 'react-native-modal-datetime-picker';
import {date, dateDot, setBasicData} from './Rank';

export const DateSelect = ({text, count}) => {
  const [open, setOpen] = useState(false);
  const setShow = () => {
    setOpen(true);
  };
  const setHide = () => {
    setOpen(false);
  };
  const setDate = d => {
    date[count].date = d;
    setHide();
  };
  return (
    <TouchableOpacity
      style={styles.inputBox}
      onPress={() => {
        setShow();
      }}>
      <Text style={styles.font16}>{text}</Text>
      <Text style={styles.font16}>
        {date[0].date ? dateDot(date[count].date) : null}
      </Text>
      <DatePicker
        isVisible={open}
        mode="date"
        date={date[count].date}
        onCancel={setHide}
        onConfirm={d => setDate(d)}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  inputBox: {
    width: 300,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 30,
  },
  font14: {
    fontSize: 14,
    color: '#000000',
  },
  font16: {
    fontSize: 16,
    color: '#000000',
  },
});
