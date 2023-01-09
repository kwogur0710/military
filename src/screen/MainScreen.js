import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {TopBar} from '../components/MainComponents/TopBar';
import {
  name,
  date,
  myRank,
  mySalary,
  dateDot,
  dateCal,
  dDate,
  toDate,
} from '../components/MainComponents/Rank';
import {Percent} from '../components/MainComponents/Percent';

const MainScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [to, setTo] = useState(new Date());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTo(new Date());
    }, 100);
    if (isFocused == false) clearTimeout(timer);
  });
  return date ? (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <View style={styles.first}>
        <View style={styles.firstBox}>
          <Text style={styles.font12}>
            {mySalary.nowSalary.rank} {mySalary.nowSalary.salary}호봉
          </Text>
          <Text style={styles.font16}>{name}</Text>
        </View>
        <View style={styles.firstBox}>
          <View style={styles.row}>
            <Text style={styles.font12}>오늘 : </Text>
            <Text style={styles.font12}>{dateDot(toDate)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.font12}>입대 : </Text>
            <Text style={styles.font12}>{dateDot(date[0].date)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.font12}>전역 : </Text>
            <Text style={styles.font12}>{dateDot(date[4].date)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.second}>
        <Text style={styles.font12}>전역까지 남은 시간</Text>
        <Text style={styles.font18}>{dateCal(date[4].date)}</Text>
        <View style={styles.secondBox}>
          <View style={styles.dDayBox}>
            <Text style={styles.font12}>전체 복무일</Text>
            <Text style={styles.font16}>
              {dDate(date[0].date, date[4].date) + 1}
            </Text>
          </View>
          <View style={styles.dDayBox}>
            <Text style={styles.font12}>현재 복무일</Text>
            <Text style={styles.font16}>{dDate(date[0].date, toDate)}</Text>
          </View>
          <View style={styles.dDayBox}>
            <Text style={styles.font12}>남은 복무일</Text>
            <Text style={styles.font16}>{dDate(toDate, date[4].date)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.third}>
        <Percent
          text="전역"
          point={1000000}
          start={date[0].date}
          end={date[4].date}
          to={to}
        />
        <Percent
          text={myRank.nextRank.rank}
          point={100000}
          start={myRank.nowRank.date}
          end={myRank.nextRank.date}
          to={to}
        />
        <Percent
          text={String(
            mySalary.nextSalary.rank +
              ' ' +
              mySalary.nextSalary.salary +
              '호봉',
          )}
          point={100000}
          start={mySalary.nowSalary.date}
          end={mySalary.nextSalary.date}
          to={to}
        />
      </View>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  first: {
    width: 300,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  firstBox: {
    justifyContent: 'center',
  },
  second: {
    width: 300,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 300,
  },
  dDayBox: {
    alignItems: 'center',
    padding: 10,
  },
  third: {
    width: 300,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  font12: {
    fontSize: 12,
    color: '#000000',
  },
  font14: {
    fontSize: 14,
    color: '#000000',
  },
  font16: {
    fontSize: 16,
    color: '#000000',
  },
  font18: {
    fontSize: 18,
    color: '#000000',
  },
  font20: {
    fontSize: 20,
    color: '#000000',
  },
});

export default MainScreen;
