import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PCF from "./src/components/PCF"
import {createContext,useState} from "react"

export const SimpData=createContext(false);

export default function App() {
  const [simp,setSimp]=useState(false);
  return (
    <SimpData.Provider value={[simp,setSimp]}>
      <PCF></PCF>
    </SimpData.Provider>
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
