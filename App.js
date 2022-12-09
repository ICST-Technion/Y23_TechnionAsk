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
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.login_button}>
        <Text style={styles.loginText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

//Screen Two
const SearchPage = () => {

  const [Query, setQuery] = useState("");
  const [Answer, setAnswer] = useState("");

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

        <TouchableOpacity style={styles.login_button} onPress={(Answer) => setAnswer(Query)}>
          <Text style={styles.loginText}>Answer</Text>
        </TouchableOpacity>  

      
      <View>
        <Text style={styles.Text}>
          {Answer}
        </Text>
      </View>
      
      
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  logo: {
    marginBottom: 10,
  },
 
  input_view: {
    backgroundColor: "#9999FF",
    borderRadius: 30,
    width: "70%",
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
    marginTop: 20,
  },
 
  login_button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#412AD4",
  },
});
