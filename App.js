import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

//Navigation import
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screen One
const LoginPage = props => {

  //onPress To Navigate
  const goToSearchPage = () => {
    props.navigation.navigate('Search Page');
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("./assets/logo.png")} />
 
      <View style={styles.input_view}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.input_view}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.Text}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.login_button} onPress={goToSearchPage}>
        <Text>Login</Text>
      </TouchableOpacity>
 
      <TouchableOpacity>
        <Text>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

//Screen Two
const SearchPage = () => {

  const [Query, setQuery] = useState("");
  const [Answer, setAnswer] = useState("");
  const [showValue, setShowValue] = useState(false);
  const [counterAnswer, setCounterAnswer] = useState(0);
  const answerArray = ["Yes", "No", "Unsure"];

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("./assets/logo.png")} />
 
      <View style={styles.Text}>
        <Text style={styles.Text}>
          {"Enter your question :["}
        </Text>
      </View>

      <View style={styles.input_view}>
        <TextInput
          style={styles.input_view}
          placeholder="When was World War 2?"
          placeholderTextColor="#003f5c"
          onChangeText={(Query) => setQuery(Query)}
        />
      </View>
      <TouchableOpacity style={styles.login_button} onPress={() => {setAnswer(answerArray[counterAnswer]); setShowValue(true); setCounterAnswer((counterAnswer+1)%(answerArray.length))}}>
        <Text style={styles.paragraph}>Search</Text>
      </TouchableOpacity>

      
      {showValue? <Text style={styles.paragraph}>Answer: {Answer}</Text> : null}
      
      
    </View>
  );
};

const App = () => {
  //const
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login Page" component={LoginPage} />
        <Stack.Screen name="Search Page" component={SearchPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfc",
    alignItems: "center",
    justifyContent: "center",
  },
 
  logo: {
    marginBottom: 10,
  },
 
  input_view: {
    backgroundColor: "#89cff0",
    borderRadius: 30,
    width: "65%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  Text: {
    height: 30,
    marginBottom: 20,
  },
 
  login_button: {
    width: "65%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#0072bb",
  },
});
