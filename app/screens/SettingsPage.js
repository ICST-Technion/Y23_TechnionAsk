import { styles } from "../styles";
import React, { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Image
} from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";
import { useTranslation } from "react-i18next";
import { writingColor } from "../styles";
export var answerService = 'ChatGPT';
export var languageVar = 'en';

export default function SettingsScreen({navigation}) {
  const { t, i18n } = useTranslation();
  const writingDirAlign = (initialStyle) => {return [initialStyle, {writingDirection : i18n.dir()}]};
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("Settings Page")
    })
  })
  
  const [radioService, setRadioService] = useState([
    {
        id: '1',
        label: ' NLP ',
        value: 'NLP',
        size: 12,
        color: writingColor
    },
    {
        id: '2',
        label: ' ChatGPT ',
        value: 'ChatGPT',
        size: 12,
        selected: true,
        color: writingColor
    }
  ]);
  const [radioLng, setRadioLng] = useState([
    {
        id: '1',
        label: ' English ',
        value: 'en',
        size: 12,
        selected: true,
        color: writingColor
    },
    {
        id: '2',
        label: ' Hebrew ',
        value: 'he',
        size: 12,
        color: writingColor
    }
  ]);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
        <Text style={styles.Title}> {t("Settings Page")} </Text>
        
          <Text style={writingDirAlign({color: writingColor})}>{t("change language")}: <RadioGroup layout="row"
            radioButtons={radioLng} 
            onPress={(radioVal) => {setRadioLng(radioVal); languageVar = radioVal[0].selected? 'en' : 'he'; i18n.changeLanguage(languageVar)}} 
          />
          </Text>
        <Text style={writingDirAlign({color: writingColor})}> {t("Answering Service:")} 
        <RadioGroup layout="row"
            radioButtons={radioService} 
            onPress={(radioVal) => {setRadioService(radioVal); answerService = radioVal[0].selected? 'NLP' : 'ChatGPT'}} 
        /></Text>
    </View>
  );
}
