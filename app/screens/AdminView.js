import { styles } from "../styles";
import React, { useLayoutEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TableView from "./TableView";

export default function AdminView({ navigation, route  }) {

  const { t, i18n } = useTranslation();
  const writingDirAlign = (initialStyle) => {return [initialStyle, {writingDirection : i18n.dir()}]};
  const [usersView, setUsersView] = useState(false);
  const [historyView, setHistoryView] = useState(false);
  const [whatever, setWhatever] = useState("");
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("Admin View Page")
    })
  })
  return (
    <View style={styles.outterContainer}>
      <TouchableOpacity style={styles.side_button} 
        onPress={() => navigation.navigate('Search Page', {'email': route.params?.email })}>
        <Text style={writingDirAlign({color: '#b88d20', height: 20, justifyContent: 'center', alignItems: 'center'})} > {t("Move on to Chat")}   </Text>
        <MaterialCommunityIcons name='chat' style={{transform: [{scaleX: i18n.dir() == 'rtl'? -1 : 1}],}} size={50} color='#b88d20'/>
      </TouchableOpacity>
      <View style={styles.alignment}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} /> 
      </View>
      <View  style={{flexDirection: 'row', justifyContent: "center"}}>
          <TouchableOpacity style={styles.view_button} onPress={() => {setUsersView(!usersView); if(historyView && !usersView) {setHistoryView(false)}}}>
              <Text style={writingDirAlign({color: '#fff'})}>{t("Users")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.view_button} onPress={() => {setHistoryView(!historyView); if(!historyView && usersView) {setUsersView(false)}}}>
              <Text style={writingDirAlign({color: '#fff'})}>{t("History")}</Text>
          </TouchableOpacity>
      </View>
      
      {usersView? <TableView  data={{ 'navigation': navigation, request : 'UsersView' , 'i18n': i18n, 't':t }}/> : <View></View> }
      {historyView? <TableView  data={{ 'navigation': navigation,  request : 'historyView', 'i18n': i18n, 't':t}}/> : <View></View> }
    </View>
  );
}