/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  setBasicData,
  name,
  saveData,
  date,
} from '../components/MainComponents/Rank';
import {DateSelect} from '../components/MainComponents/DateSelect';

const EnlistSetScreen = ({route}) => {
  const navigation = useNavigation();
  const [inputName, setInputName] = useState(name ? name : '홍길동');
  const [next, setNext] = useState(
    route.params?.back ? route.params?.back : false,
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 50}} />
      <View style={styles.inputBox}>
        <Text style={styles.font16}>이름</Text>
        <TextInput
          value={inputName}
          style={styles.font16}
          onChangeText={e => {
            setInputName(e);
          }}
        />
      </View>
      <View style={styles.line} />
      <DateSelect text={'입대일'} count={0} />
      <View style={styles.line} />
      {next ? (
        <>
          <DateSelect text={'전역일'} count={4} />
          <View style={styles.line} />
          <DateSelect text={'일병 진급일'} count={1} />
          <View style={styles.line} />
          <DateSelect text={'상병 진급일'} count={2} />
          <View style={styles.line} />
          <DateSelect text={'병장 진급일'} count={3} />
          <View style={styles.line} />
        </>
      ) : null}
      {next ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setBasicData(inputName, 'save');
            saveData('date', date);
            saveData('name', name);
            navigation.push('MainScreen');
          }}>
          <Text style={styles.font16}>저 장</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setBasicData(inputName, 'next');
            setNext(true);
          }}>
          <Text style={styles.font16}>다 음</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: 300,
    height: 40,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA07A',
  },
  inputBox: {
    width: 300,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 30,
  },
  line: {
    width: 300,
    borderColor: '#BBBBBB',
    borderBottomWidth: 1,
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
export default EnlistSetScreen;
