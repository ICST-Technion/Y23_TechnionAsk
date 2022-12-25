//Navigation import
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomePage from '../screens/WelcomePage';
import LoginPage from '../screens/LoginPage';
import SignUpPage from '../screens/SignUpPage';
import SearchPage from '../screens/SearchPage';
import ForgotPasswordPage from '../screens/ForgotPasswordPage';
import SearchHistoryPage from '../screens/SearchHistoryPage';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Welcome Page'>
            <Stack.Screen name="Welcome Page" component={WelcomePage} />
            <Stack.Screen name="Login Page" component={LoginPage} />
            <Stack.Screen name="Sign up Page" component={SignUpPage} />
            <Stack.Screen name="Search Page" component={SearchPage} />
            <Stack.Screen name="Search History Page" component={SearchHistoryPage} />
            <Stack.Screen name="Forgot Password Page" component={ForgotPasswordPage} />
          </Stack.Navigator>
      );
}

export {MainStackNavigator};