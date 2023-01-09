import AsyncStorage from '@react-native-async-storage/async-storage';

export let result = false;
export let name = '';
export const setName = value => {
  name = value;
};
export let toDate = '';
export let date = [
  //[0] : 입대일
  {rank: '이병', date: null},
  //[1] : 일병 진급일
  {rank: '일병', date: null},
  //[2] : 상병 진급일
  {rank: '상병', date: null},
  //[3] : 병장 진급일
  {rank: '병장', date: null},
  //[4] : 전역일
  {rank: '민간인', date: null},
];
//현재 계급(현재 호봉), 다음 계급(1호봉)을 저장하는 변수
export const myRank = {
  nowRank: {rank: null, date: null},
  nextRank: {rank: null, date: null},
};
//현재 호봉(현재 계급), 다음 호봉(계급)을 저장하는 변수
export const mySalary = {
  nowSalary: {rank: null, salary: null, date: null},
  nextSalary: {rank: null, salary: null, date: null},
};
export const setToDate = value => {
  toDate = value;
};
//첫 화면에서 저장 버튼을 눌렀을때
export const setBasicData = (n, screen) => {
  if (screen == 'next') {
    date[1].date = new Date(
      date[0].date.getFullYear(),
      date[0].date.getMonth() + 3,
      1,
    );
    date[2].date = new Date(
      date[1].date.getFullYear(),
      date[1].date.getMonth() + 6,
      1,
    );
    date[3].date = new Date(
      date[2].date.getFullYear(),
      date[2].date.getMonth() + 6,
      1,
    );
    date[4].date = new Date(
      date[0].date.getFullYear(),
      date[0].date.getMonth() + 18,
      date[0].date.getDate() - 1,
    );
  } else {
    name = n;
    setMyRank();
  }
};
//입대일 수정을 위한 함수
export const setFromDate = value => {
  date[0].date = value;
};
//myRank, mySalary 초기값 지정하는 함수
export const setMyRank = () => {
  let count = -1;
  date.map(d => {
    if (d.date <= toDate) count++;
  });
  if (count >= 3) count = 3;
  setNowRank(count);
  setNextRank(count);
  setNowSalary(count);
  setNextSalary(count);
};
//myRank.nowRank 값을 저장하는 함수
const setNowRank = count => {
  myRank.nowRank.rank = date[count].rank;
  myRank.nowRank.date = date[count].date;
};

//myRank.nextRank 값을 저장하는 함수
const setNextRank = count => {
  myRank.nextRank.rank = date[count + 1].rank;
  myRank.nextRank.date = date[count + 1].date;
};

//mySalary.nowSalary 값을 저장하는 함수
const setNowSalary = count => {
  mySalary.nowSalary.rank = date[count].rank;
  mySalary.nowSalary.salary = salaryCal(
    date[count].date.getMonth(),
    toDate.getMonth(),
  );
  toDate.getFullYear() == date[0].date.getFullYear() &&
  toDate.getMonth() == date[0].date.getMonth()
    ? (mySalary.nowSalary.date = new Date(
        toDate.getFullYear(),
        toDate.getMonth(),
        date[0].date.getDate(),
      ))
    : (mySalary.nowSalary.date = new Date(
        toDate.getFullYear(),
        toDate.getMonth(),
        1,
      ));
  if (toDate >= date[4].date)
    mySalary.nowSalary.date = new Date(
      date[4].date.getFullYear(),
      date[4].date.getMonth(),
      1,
    );
};

//mySalary.nextSalary 값을 저장하는 함수
const setNextSalary = count => {
  const nextDate = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 1);
  if (date[count].date <= nextDate && nextDate < date[count + 1].date) {
    mySalary.nextSalary.rank = date[count].rank;
    mySalary.nextSalary.salary = salaryCal(
      date[count].date.getMonth(),
      nextDate.getMonth(),
    );
  } else if (date[count].date <= nextDate && nextDate >= date[count + 1].date) {
    mySalary.nextSalary.rank = date[count + 1].rank;
    mySalary.nextSalary.salary = salaryCal(
      date[count + 1].date.getMonth(),
      nextDate.getMonth(),
    );
  }
  mySalary.nextSalary.date = new Date(nextDate);
  if (toDate >= date[4].date) mySalary.nextSalary.date = new Date(date[4].date);
};

//호봉 계산을 위한 함수 (진급일(Date), 오늘(Date))
const salaryCal = (start, end) => {
  let s = start;
  let e = end;
  if (e - s < 0) e = e + 12;
  return e - s + 1;
};
//날짜 변수를 XXXX.XX.XX로 표시하기 위한 함수
export const dateDot = dateS => {
  const year = dateS.getFullYear();
  const month = dateS.getMonth();
  const day = dateS.getDate();
  return `${year}. ${month + 1}. ${day}`;
};

//D-DAY 날짜 계산을 위한 함수
export const dDate = (start, end) => {
  const calcDay = 24 * 60 * 60 * 1000;
  const dTime = end.getTime() - start.getTime();
  const Ddate = Math.floor(dTime / calcDay) + 1;
  //ceil : 반올림, floor : 내림, round : 반올림
  return Ddate <= 0 ? 0 : Ddate;
};

//기기 저장공간에 저장하는 함수
export const saveData = async (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e) {
    console.error(e.message);
  }
};

//기기 저장공간에서 가져오는 함수
export const getData = async () => {
  try {
    const dateData = await JSON.parse(await AsyncStorage.getItem('date'));
    const nameData = await JSON.parse(await AsyncStorage.getItem('name'));
    setDate(dateData);
    setMyRank();
    name = nameData;
    result = true;
  } catch (e) {
    console.log(e.message);
  }
};

//date 날짜 지정하는 함수
const setDate = d => {
  date[0].date = new Date(d[0].date);
  date[1].date = new Date(d[1].date);
  date[2].date = new Date(d[2].date);
  date[3].date = new Date(d[3].date);
  date[4].date = new Date(d[4].date);
};

export const dateCal = end => {
  const calcDay = 24 * 60 * 60 * 1000;
  let s = toDate,
    e = end,
    y = 0,
    m = 0,
    d = 0,
    r = 0,
    newS = new Date();
  y = e.getFullYear() - s.getFullYear();
  m = e.getMonth() - s.getMonth();
  d = e.getDate() - s.getDate();
  newS = new Date(s.getFullYear() + y, s.getMonth() + m, s.getDate());
  d = Math.floor((e.getTime() - newS.getTime()) / calcDay);
  if (d < 0) {
    m -= 1;
    newS = new Date(s.getFullYear() + y, s.getMonth() + m, s.getDate());
    d = Math.floor((e.getTime() - newS.getTime()) / calcDay);
  }
  if (m < 0) {
    m += 12;
    y -= 1;
  }
  if (y <= 0 && m <= 0 && d <= 0) r = '전역을 축하합니다!';
  else {
    if (y > 0) r = y + '년 ' + m + '개월 ' + d + '일';
    else if (m > 0) r = m + '개월 ' + d + '일';
    else if (d > 0) r = d + '일';
  }
  return r;
};