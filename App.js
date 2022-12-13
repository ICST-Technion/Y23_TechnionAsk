import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Linking
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
        <Text style={styles.paragraph}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.login_button} onPress={goToSearchPage}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text >Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

//Screen Two
const SearchPage = () => {

  const [Query, setQuery] = useState("");
  const [Answer, setAnswer] = useState("");
  const [Source, setSource] = useState([""]);
  const [showValue, setShowValue] = useState(false);
  const [counterAnswer, setCounterAnswer] = useState(0);
  const answerArray = ["World War II lasted from 1939 to 1945.", "Germany started World War II."];
  const sourceArray = [["https://en.wikipedia.org/wiki/World_War_II", "https://www.britannica.com/event/World-War-II"], ["https://www.britannica.com/event/World-War-II"]]

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("./assets/logo.png")} />
 
      <View style={styles.Text}>
        <Text style={styles.Text}>
          {"Enter your question"}
        </Text>
      </View>

      <View style={styles.input_view}>
        <TextInput
          style={styles.input_view}
          placeholder="When was World War II?"
          placeholderTextColor="#003f5c"
          onChangeText={(Query) => setQuery(Query)}
        />
      </View>

      <TouchableOpacity style={styles.login_button} onPress={() => {setSource(sourceArray[counterAnswer]); setAnswer(answerArray[counterAnswer]); setShowValue(true); setCounterAnswer((counterAnswer+1)%(answerArray.length))}}>
        <Text style={styles.paragraph}>Search</Text>
      </TouchableOpacity>

      {showValue? <Text style={styles.paragraph}>Answer:</Text> : null}
      {showValue? <Text style={styles.Text}>{Answer}</Text> : null}
      {showValue? <Text style={styles.paragraph}>Sources:</Text> : null}
      {showValue? <Text style={{color: 'blue'}} onPress={() => Linking.openURL(Source[0])}> {Source[0]}</Text> : null}
      {showValue && Source.length>1? <Text style={{color: 'blue'}} onPress={() => Linking.openURL(Source[1])}> {Source[1]}</Text> : null}
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
    borderRadius: 20,
    width: "65%",
    height: 40,
    marginBottom: 10,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems: "center",
  },
 
  Text: {
    height: 20,
    marginBottom: 10,
  },

  login_button: {
    width: "65%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#0072bb",
  },
});
