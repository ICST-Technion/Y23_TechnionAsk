import React, {useState} from 'react';
import { styles } from '../styles';
import {Modal, Switch, Text, TouchableOpacity, View, Animated} from 'react-native';
import { backendURL } from './SendHTTPRequest';
import { useTranslation } from "react-i18next";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
var adminSettings = {};

async function getNLPData  (route, t) {
    if (route == "" || route == undefined)
        return;
    await fetch(backendURL+route)
    .then((response) => response.json())
    .then((responseJson) => {
        if(!( route.startsWith("viewAdminSettings")) && !responseJson['result'])
        {alert(t("Saving settings action was unsuccessful\nOld values are restored"));}
        if(route.startsWith("viewAdminSettings") && responseJson['result'] == true) {
          adminSettings = ({'result' : true, 'login' : responseJson['login_enabled'], 'signup' : responseJson['signup_enabled']});
        }
        if(route.startsWith('viewAdminSettings') && responseJson['result'] == false)
        {
          adminSettings = ({'error' : 'error'});
        }
    })
    .catch(error => {
        alert(error);
    });
    return adminSettings;
}

const AdminSettings = ({data}) => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabledLogin, setIsEnabledLogin] = useState('login' in adminSettings? adminSettings['login'] : false);
  const toggleLoginSwitch = () => setIsEnabledLogin(previousState => !previousState);
  const [isEnabledSignUp, setIsEnabledSignUp] = useState('signup' in adminSettings? adminSettings['signup'] : false);
  const toggleSignUpSwitch = () => setIsEnabledSignUp(previousState => !previousState);
  const handleSettingsFetch = async () => {
    const fetchedAdminSettings = await getNLPData("viewAdminSettings" + '?username=' + encodeURIComponent(data['username']), t);
    if ('result' in fetchedAdminSettings && fetchedAdminSettings['result']) {
      setIsEnabledLogin(fetchedAdminSettings['login']);
      setIsEnabledSignUp(fetchedAdminSettings['signup']);
      setModalVisible(true);
    }
  };
  return (
    <View>
      <Modal style={styles.container}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold'}}>{t("Admin Settings")}</Text>
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
              onPress={() => {getNLPData("changeAdminSettings" + '?loginEnabled=' + encodeURIComponent(isEnabledLogin) + "&signupEnabled=" + encodeURIComponent(isEnabledSignUp)); setModalVisible(!modalVisible);}}>
              <Text style={{fontSize: 15}}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {setModalVisible(!modalVisible);}}>
              <Text style={{fontSize: 12}}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.otherside_button}
        onPress={async () => {
          await handleSettingsFetch()}}>
          <MaterialIcons name='settings' style={{margin: 10}} size={40} color='#b88d20'/>
      </TouchableOpacity>
    </View>
  );
};
export default AdminSettings;