import { styles } from "../styles";
import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Linking,
    Animated
  } from "react-native";
import SearchHTTPRequest from "./SearchHTTPRequest";


export default function SearchPage ({navigation, route}) {
  const [query, setQuery] = useState("Enter a question")
  return (
    <View style={styles.outterContainer}>
      <View>
        {(route.params?.email=='')? <Text>Hello, Guest</Text> : <Text>Hello, {route.params?.email}</Text>}
      </View>
      
      <View style={styles.halfContainer}>
        <Image source={require("../../assets/logo.png")} />
        <View style={styles.Text}>
          <Text style={styles.Text}>
              {"Enter your question"}
              </Text>
          </View>

              <View style={styles.input_view}>
              <TextInput
              style={styles.input_view}
              placeholder = {query}
              placeholderTextColor="#003f5c"
              onChangeText={(query) => setQuery(query)}
              />
          </View>
      </View>
      <SearchHTTPRequest data={{'httpRequestType' : 'Search', 'email' : route.params?.email}}/>
      
    </View>
  );
};