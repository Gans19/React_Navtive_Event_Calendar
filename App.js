import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import CalendarScreen from "./CalendarScreen";
import MyCalendar from "./CalendarScreen";

// if we nee this is functional component then takes this page
// import MyCalendar from "./CustomCalendar";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <MyCalendar /> */}
      <MyCalendar />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
