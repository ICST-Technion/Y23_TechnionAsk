import React from "react";
import {
  StyleSheet
} from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fcfbfc",
      alignItems: "center",
      justifyContent: "center",
    },
    outterContainer: {
      backgroundColor: "#fcfbfc",
      flex: 1,
    },
    alignment: {
      backgroundColor: "#fcfbfc",
      alignItems: "center",
      justifyContent: "center"
    },
    halfContainer: {
      backgroundColor: "#fcfbfc",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 200,
    },
   
    logo: {
      marginBottom: 10,
      height: 150,
      width: 150,
    },
   
    loadingIcon: {
      height: 10,
      width: 10,
      marginBottom: 10,
    },
    
    sendIcon: {
      marginBottom: 5,
      marginRight: 5,
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
      marginBottom: 10,
    },
    
    TextAnswer: {
      marginBottom: 10,
      margin: 20,
    },
  
    Title: {
      height: 40,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
    },
  
    Header: {
      height: 30,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 15,
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
    errorColor: {
      color : '#FF0000',
    },
  });
  