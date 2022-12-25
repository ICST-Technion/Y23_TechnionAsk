import { styles } from "../styles";
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


export default function SearchPage ({navigation, route}) {
    
  const [Query, setQuery] = useState("When was World War II?");
  const [Answer, setAnswer] = useState("");
  const [Source, setSource] = useState([""]);
  const [showValue, setShowValue] = useState(false);
  const [counterAnswer, setCounterAnswer] = useState(0);
  const answerArray = ["World War II lasted from 1939 to 1945.", "Germany started World War II."];
  const sourceArray = [["https://en.wikipedia.org/wiki/World_War_II", "https://www.britannica.com/event/World-War-II"], ["https://www.britannica.com/event/World-War-II"]]

  return (
    <View style={styles.container}>
    
      <View>
        {(route.params?.email=='')? <Text>Hello, Guest</Text> : <Text>Hello, {route.params?.email}</Text>}
      </View>
      
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      
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

      
      <TouchableOpacity onPress={() => {navigation.navigate({name: 'Search History Page', params: {question: Query, answerArray: answerArray}})}}>
        <Text style={styles.paragraph}>Search History</Text>
      </TouchableOpacity>
    </View>
  );
};