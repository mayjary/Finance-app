import React from 'react';
import { View, Text, StyleSheet, Switch, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../redux/themeSlice';
import { RootState } from '../redux/store';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const toggleSwitch = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Settings</Text>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#040343',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
  lightText: {
    color: '#040343',
  },
  darkText: {
    color: '#ffffff',
  },
});

export default SettingsScreen;

