import React, {useState, useEffect} from 'react';
//import {useFonts} from 'expo-font';
import RootStack from './src/route/RootStack';
import {
  getData,
  result,
  setFromDate,
  setToDate,
} from './src/components/MainComponents/Rank';

export default function App() {
  setFromDate(new Date());
  setToDate(new Date());
  getData();
  const [time, setTime] = useState(false);
  console.log('result', result);
  useEffect(() => {
    setTimeout(() => {
      setTime(true);
      console.log(true);
    }, 1000);
  }, []);
  return result ? (
    <RootStack screen="MainScreen" />
  ) : time ? (
    <RootStack screen="EnlistSetScreen" />
  ) : null;
}
/*
  let [fontsLoaded] = useFonts({
    PretendardBlack: require('../assets/fonts/Pretendard-Black.ttf'),
    PretendardBold: require('../assets/fonts/Pretendard-Bold.ttf'),
    PretendardExtraBold: require('../assets/fonts/Pretendard-ExtraBold.ttf'),
    PretendardExtraLight: require('../assets/fonts/Pretendard-ExtraLight.ttf'),
    PretendardLight: require('../assets/fonts/Pretendard-Light.ttf'),
    PretendardMedium: require('../assets/fonts/Pretendard-Medium.ttf'),
    PretendardRegular: require('../assets/fonts/Pretendard-Regular.ttf'),
    PretendardSemiBold: require('../assets/fonts/Pretendard-SemiBold.ttf'),
    PretendardThin: require('../assets/fonts/Pretendard-Thin.ttf'),
    PretendardVariable: require('../assets/fonts/PretendardVariable.ttf'),
  });
  */
