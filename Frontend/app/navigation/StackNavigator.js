//Navigation import
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomePage from '../screens/WelcomePage';
import Home from '../screens/HomePage';
import LoginPage from '../screens/LoginPage';
import SignUpPage from '../screens/SignUpPage';
import SearchPage from '../screens/SearchPage';
import ForgotPasswordPage from '../screens/ForgotPasswordPage';
import ChatScreen from '../screens/chatStyle';
import AdminView from '../screens/AdminView';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    const {t, i18n} = useTranslation();
    const backButton = i18n.dir()=='ltr'? require("../../assets/leftBackButton.png") : require("../../assets/rightBackButton.png") ;
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerBackImageSource: backButton, headerTitleAlign: 'center', headerStyle: {height: 50, backgroundColor: '#0f1d41'}, headerTintColor: '#fff'}}> 
        
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Welcome Page" component={WelcomePage} />
            <Stack.Screen name="Login Page" component={LoginPage} />
            <Stack.Screen name="Sign up Page" component={SignUpPage} />
            <Stack.Screen name="Forgot Password Page" component={ForgotPasswordPage} />
            <Stack.Screen name="Search Page" component={ChatScreen} />
            <Stack.Screen name="Admin View Page" component={AdminView} />
          </Stack.Navigator>
      );
}

export {MainStackNavigator};