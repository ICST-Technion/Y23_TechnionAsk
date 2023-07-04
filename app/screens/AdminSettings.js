import React, {useState} from 'react';
import { styles } from '../styles';
import {Modal, Switch, Text, TouchableOpacity, View, Animated} from 'react-native';
import { backendURL } from './SendHTTPRequest';
import { useTranslation } from "react-i18next";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
async function getNLPData  (route, t) {
    if (route == "" || route == undefined)
        return;
    await fetch(backendURL+route+paramList)
    .then((response) => response.json())
    .then((responseJson) => {
        if(!responseJson['result'])
        {alert(t("Saving settings action was unsuccessful\nOld values are restored"));}
    })
    .catch(error => {
        alert(error);
    });
}

const AdminSettings = () => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabledLogin, setIsEnabledLogin] = useState(false);
  const toggleLoginSwitch = () => setIsEnabledLogin(previousState => !previousState);
  const [isEnabledSignUp, setIsEnabledSignUp] = useState(false);
  const toggleSignUpSwitch = () => setIsEnabledSignUp(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Modal style={styles.container}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Admin Settings</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>Login Enabled</Text>
                <Switch style={{margin: 5}}
                    trackColor={{false: '#ececec', true: '#d7be69'}}
                    activeThumbColor={'#b58d20'}
                    onValueChange={toggleLoginSwitch}
                    value={isEnabledLogin}
                />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>Sign Up Enabled</Text>
                <Switch style={{margin: 5}}
                    trackColor={{false: '#ececec', true: '#d7be69'}}
                    activeThumbColor={'#b58d20'}
                    onValueChange={toggleSignUpSwitch}
                    value={isEnabledSignUp}
                />
            </View>
            <TouchableOpacity
              onPress={() => {alert("ChangeAdminSettings" + '?loginEnabled=' + encodeURIComponent(isEnabledLogin) + "&signUpEnabled=" + encodeURIComponent(isEnabledSignUp)); setModalVisible(!modalVisible);}}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.otherside_button}
        onPress={() => setModalVisible(true)}>
          <MaterialIcons name='settings' style={{margin: 10}} size={40} color='#b88d20'/>
      </TouchableOpacity>
    </View>
  );
};
export default AdminSettings;