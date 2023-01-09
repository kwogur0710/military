import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import {dateDot, dDate, mySalary} from './Rank';
//퍼센트로 표시할 함수
export const Percent = ({text, point, start, end, to}) => {
  //const isFocused = useIsFocused();
  let toD = to;
  if (toD >= end) toD = end;
  const perc =
    (toD.getTime() - start.getTime()) / (end.getTime() - start.getTime());
  return (
    <View style={{marginBottom: 20}}>
      <View style={styles.percentText}>
        <Text style={styles.font16}>{text}</Text>
        <Text style={styles.font14}>D-{dDate(toD, end)}</Text>
      </View>
      <View style={styles.percentText}>
        <Text style={styles.font14}>{dateDot(start)}</Text>

        <Text style={styles.font14}>{dateDot(end)}</Text>
      </View>
      <Progress.Bar
        progress={perc}
        width={300}
        height={8}
        color={'#FFA07A'}
        animated={false}
      />
      <Text style={styles.font14}>
        {Math.floor(perc * (point * 100)) / (point * 1.0)}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  percentText: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
