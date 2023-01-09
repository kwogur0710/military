import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//import {Feather} from '@expo/vector-icons';

export const TopBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.topBar}>
      <View style={styles.topIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EnlistSetScreen', {back: true});
          }}>
          {/*<Feather name="edit-2" size={24} color="black" />*/}
          <Text style={styles.font16}>수정</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.font20}>전역일 계산기</Text>
      <View style={styles.topIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  topBar: {
    width: '100%',
    height: 40,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  topIcon: {
    width: 40,
    height: 40,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  font14: {
    fontSize: 14,
    color: '#000000',
  },
  font16: {
    fontSize: 16,
    color: '#000000',
  },
  font20: {
    fontSize: 20,
    color: '#000000',
  },
});
