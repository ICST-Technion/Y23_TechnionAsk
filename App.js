import React from "react";
//Navigation import
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from "./app/navigation/StackNavigator";
import "./app/screens/i18n"
const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;