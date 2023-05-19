import { styles, writingColor } from "../styles";
import React, { useLayoutEffect, Component } from "react";
import {
  Text,
  View,
  Image, Animated,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Table, Row, Rows } from 'react-native-table-component';
import { TextInput } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { backendURL } from "./SendHTTPRequest";

export function oppositeStatus(status) {
  if(status == "Blocked")
    return "Active"
  return "Blocked"
}



export default class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      tableHead: [],
      tableData: [],
      filterStr: "",
      request: this.props.data['request'],
      initialize: false,
      loading: false,
      i18n: this.props.data['i18n'],
      t: this.props.data['t']
    }
  }

  getNLPData = async (route) => {
    const state = this.state;
    const t = state.t;
    if (route == "" || route == undefined)
        return;
    await fetch(backendURL+route)
    // The option above sends Email and Password as parameters, 
    // the option below sends them in a json body, uncomment in backend adding headers
    //  ,{
    //     method: 'OPTIONS',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         username: this.props.data['email'],
    //         password: this.props.data['password'],
    //     })
    // })
    .then((response) => response.json())
    .then((responseJson) => {
      let newTableHead = this.state.request=="UsersView"?  this.adjustUserHeader(responseJson['tableHead'], this.getColumnID(responseJson['tableHead'], 'Status'), this.getColumnID(responseJson['tableHead'], 'Privileges')) : responseJson['tableHead'];
      let newTableData = this.state.request=="UsersView"?  this.addButtons(responseJson['result'], this.getColumnID(responseJson['tableHead'], "Privileges"), this.getColumnID(responseJson['tableHead'], "Status")) : responseJson['result'];
      this.setState({
            data: responseJson,
            loading: false,
            tableHead: newTableHead.map(function(item) {return t(item)}),
            tableData: newTableData,
            initialize: true,
        })
    })
    .catch(error => {
        this.setState({data: {'data' : 'Error'}})
    });
  }
  sendReq = async (route, username) => {
    if (route == "" || route == undefined)
        return;
    await fetch(backendURL+ route + '?username=' + encodeURIComponent(username))
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson['result'])
      // Lara - TODO uncomment
        this.getNLPData("getAllUsers")
        // return responseJson['result']
      // this.setState({
      //       data: responseJson,
      //       loading: false,
      //       tableData: tableData[],
      //   })
      return responseJson['result'];
    })
    .catch(error => {
        this.setState({data: {'data' : 'Error'}})
    });
  }
  getColumnID = (tableHead, name) => {
    const state = this.state;
    for(var i = 0; i <tableHead.length;i++)
    {
      if(tableHead[i] == name)
        return i;
    }
    return -1;
  }
  addButtons = (tableData, adminColumn, statusColumn) => {
    let state = this.state;
    const t = state.t;
    let sendRequest = (route, username) => this.sendReq(route, username)
    return tableData
    .map(function(item){
      if(state.request == 'UsersView')
      {
        if(adminColumn != -1 && statusColumn != -1)
        {
          const statusIcon = <View style={{justifyContent: 'center'}}><TouchableOpacity onPress={()=> {sendRequest("changeAccess", item[0]); }} style={{alignItems: 'center'}}>{ item[statusColumn] == 'Blocked'? <View style={{flexDirection: 'row'}}><Text>{t("Unblock")} </Text><MaterialIcons name={'check-box'} color='#0b6623' size={20}/></View> : <View style={{flexDirection: 'row'}}><Text>{t("Block")} </Text><MaterialIcons name={'app-blocking'} color='#d21404' size={20}/></View>}</TouchableOpacity></View>
          const privIcon = <View style={{justifyContent: 'center'}}><TouchableOpacity onPress={()=> sendRequest("changePrivilege", item[0])} style={{alignItems: 'center'}}>{!item[adminColumn]? <View style = {{flexDirection: 'row'}}><Text>{t("Make Admin")}</Text><MaterialIcons name={'supervised-user-circle'} color='#0b6623' size={20}/></View> : <View style = {{flexDirection: 'row'}}><Text>{t("Strip Admin")}</Text><MaterialIcons name={'supervisor-account'} color='#d21404' size={20}/> </View> }</TouchableOpacity></View>;
          item[statusColumn] = t(item[statusColumn])
          return [...item.slice(0, adminColumn),item[adminColumn]? t('Admin') : t('User') , ...[privIcon], ...item.slice(adminColumn+1, statusColumn+1), ...[statusIcon]];
        }
      }
      return item
    })
  }
  filteredElements = () => {
    let state = this.state;
    const button1 = this.getColumnID(state.tableHead, 'Change Privileges');
    const button2 = this.getColumnID(state.tableHead, 'Change Access');
    return state.tableData
    .filter(function(item){
      if(state.filterStr == "") {
        return true;
      }
      for(var i = 0; i < item.length;i++)
      {
        if(i != button1 && i != button2 && (item[i].toLowerCase()).includes((state.filterStr).toLowerCase()))
          return true;
      }
    })
  }
  adjustUserHeader(tableHead, statusColumn, adminColumn) {
    const state = this.state;
    if(state.request == 'UsersView')
    {
     return [...tableHead.slice(0, adminColumn+1), ...['Change Privileges'] ,...tableHead.slice(adminColumn+1, statusColumn+1), ...['Change Access']]
    }
    return tableHead;
  }
  componentDidMount = () => {
    this.filteredElements();
  }
  render() {
    if(!this.state.initialize) {
      this.getNLPData(this.state.request=="UsersView"? "getAllUsers" : "getAllHistory");
      // this.setState({tableHead: this.adjustUserHeader(this.getColumnID('Status'), this.getColumnID('Privileges')), tableData: this.addButtons(this.getColumnID('Privileges'), this.getColumnID('Status')), initialize: true})
    }
    const state = this.state;
    const i18n = state.i18n;
    const t = state.t;
    return (
      <View style={{ padding: 20, backgroundColor: '#ececec' , direction: i18n.dir()}}>
      <View style={{flexDirection: 'row', paddingBottom: 10}}> <Text>{t("Filter")}: </Text><TextInput style={{borderWidth: 1, borderRadius: 5}} onChangeText={(newFilter) => {this.setState({filterStr: newFilter})}}/></View>
        {state.initialize? <Table borderStyle={{borderWidth: 2, borderColor: '#b88d20', borderBottomColor: '#b88d20'}} >
          <Row data={state.tableHead} textStyle={{textAlign: 'center', fontWeight: "bold", }}/>
          <Rows data={this.filteredElements()} textStyle={{textAlign: 'center', writingDirection: 'auto'}}/>
        </Table> : <View></View>}
      </View>
    )
  }
}