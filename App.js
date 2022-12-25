import React from "react";
import styles from './app/styles'

//Navigation import
import { NavigationContainer  } from '@react-navigation/native';
import { MainStackNavigator } from "./app/navigation/StackNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;