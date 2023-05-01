import {
  StyleSheet
} from "react-native";

export var backgroundColor = '#ececec';
export var writingColor = '#000';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:  backgroundColor,
      alignItems: "center",
      justifyContent: "center",
    },
    outterContainer: {
      backgroundColor: backgroundColor,
      flex: 1,
    },
    alignment: {
      backgroundColor: backgroundColor,
      alignItems: "center",
      justifyContent: "center"
    },
    halfContainer: {
      backgroundColor: backgroundColor,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 100,
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
      backgroundColor: "#b88d20",
      borderRadius: 10,
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
      color: '#fff',
    },
   
    Text: {
      marginBottom: 10,
      color: writingColor
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
      color: writingColor,
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
      borderRadius: 10,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: "#b88d20",
    },
    errorColor: {
      color : '#FF0000',
    },
  }
  );