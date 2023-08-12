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
import ExcelExport from "./excelExport";
import TablePagination from "./TablePagination";
import { Button } from "react-native-paper";

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
      filterUser: "",
      filterQues: "",
      filterAns: "",
      filterPriv: "",
      filterStatus: "",
      filterOperator: 'And', // Default operator
      filterMode: 'includes', // Default mode
      request: this.props.data['request'],
      initialize: false,
      loading: false,
      i18n: this.props.data['i18n'],
      t: this.props.data['t']
    }
  }
  /* getNLPData sends an HTTP request to the backend to get all Users or get all History
  * route is the request route either getAllUsers or getAllHistory
  * Updates the state of the table shown at AdminView
  */
  getNLPData = async (route) => {
    const state = this.state;
    const t = state.t;
    if (route == "" || route == undefined)
        return;

    await fetch(backendURL+route)
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
  /* sendReq sends an HTTP request to the backend 
  * route is the HTTP request route which is relating to the admin settings and is one of {changeAccess, changePrivilege}
  * username is the username of the user the admin wishes to change their access or privilege
  * changes the state data upon success
  */
  sendReq = async (route, username) => {
    if (route == "" || route == undefined)
        return;
    await fetch(backendURL+ route + '?username=' + encodeURIComponent(username))
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson['result']){
        this.getNLPData("getAllUsers");
      }
      return responseJson['result'];
    })
    .catch(error => {
        this.setState({data: {'data' : 'Error'}})
    });
  }
  filterItemStatus = (item, filter) => {
    if(this.state.filterMode == 'includes')
      return item.toLowerCase().includes(filter.toLowerCase());
    return item.toLowerCase().startsWith(filter.toLowerCase());
  }
  filterAllMatch = (itemsArray, filtersArray) =>
  {
    for(var i = 0; i < itemsArray.length; i++)
    {
      if( filtersArray[i] != '' && !this.filterItemStatus(itemsArray[i], filtersArray[i]))
        return false;
    }
    return true;
  }
  filterAnyMatch = (itemsArray, filtersArray) =>
  {
    for(var i = 0; i < itemsArray.length; i++)
    {
      if(filtersArray[i] != '' && this.filterItemStatus(itemsArray[i], filtersArray[i]))
        return true;
    }
    return false;
  }
  getColumnID = (tableHead, name) => {
    const state = this.state;
    for(var i = 0; i < tableHead.length;i++)
    {
      if(tableHead[i] == name)
        return i;
    }
    return -1;
  }
  adjustExcelData = (tableData, tableHead) => {
    let request = this.state.request
    const privColumn = this.getColumnID(tableHead, "Privileges");
    return tableData
    .map(function(item){
      if(request == "UsersView") {
        item[privColumn] = item[privColumn]? 'Admin' : 'User'
      }
      return item;
    })
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
          const statusIcon = <View style={{justifyContent: 'center'}}>
          <Button onPress={()=> {sendRequest("changeAccess", item[0]); }} style={{alignItems: 'center'}}>
          
          { item[statusColumn] == 'Blocked'? 
          <View style={{flexDirection: 'row'}}><Text style={{color: '#000'}}>{t("Unblock")} </Text>
          <MaterialIcons name={'check-box'} color='#0b6623' size={20}/>
          </View> 
          : 
          <View style={{flexDirection: 'row'}}><Text style={{color: '#000'}}>{t("Block")} </Text>
          <MaterialIcons name={'app-blocking'} color='#d21404' size={20}/></View>}
          </Button>
          </View>
          const privIcon = <View style={{justifyContent: 'center'}}>
          <Button onPress={()=> sendRequest("changePrivilege", item[0])} style={{alignItems: 'center'}}>
          {!item[adminColumn]? 
          <View style = {{flexDirection: 'row'}}><Text style={{color: '#000'}}>{t("Make Admin")}</Text>
          <MaterialIcons name={'supervised-user-circle'} color='#0b6623' size={20}/></View>
          : 
          <View style = {{flexDirection: 'row'}}><Text style={{color: '#000'}}>{t("Strip Admin")}</Text>
          <MaterialIcons name={'supervisor-account'} color='#d21404' size={20}/> </View> }
          </Button></View>;
          item[statusColumn] = t(item[statusColumn]);
          return [...item.slice(0, adminColumn),item[adminColumn]? t('Admin') : t('User') , ...[privIcon], ...item.slice(adminColumn+1, statusColumn+1), ...[statusIcon]];
        }
      }
      return item
    })
  }
  filteredHistoryElements = () => {
    let state = this.state;
    const userColumn = this.getColumnID(state.tableHead, 'Username');
    const quesColumn = this.getColumnID(state.tableHead, 'Question');
    const ansColumn = this.getColumnID(state.tableHead, 'Answer');
    let filterAllMatch = this.filterAllMatch.bind(this);
    let filterAnyMatch = this.filterAnyMatch.bind(this);
    return state.tableData
    .filter(function(item){
      if(state.filterUser == "" && state.filterQues == "" && state.filterAns == "") {
        return true;
      }
      var itemsArray = [item[userColumn], item[quesColumn], item[ansColumn]];
      var filtersArray = [state.filterUser, state.filterQues, state.filterAns]
      if((state.filterOperator == 'And' && filterAllMatch(itemsArray, filtersArray)) || (state.filterOperator == 'Or' && this.filterAnyMatch(itemsArray, filtersArray)))
          return true;
      return false;
    })
  }
  filteredUsersElements = () => {
    let state = this.state;
    const userColumn = this.getColumnID(state.tableHead, 'Username');
    const privColumn = this.getColumnID(state.tableHead, 'Privileges');
    const statColumn = this.getColumnID(state.tableHead, 'Status');
    let filterAllMatch = this.filterAllMatch.bind(this);
    let filterAnyMatch = this.filterAnyMatch.bind(this);
    return state.tableData
    .filter(function(item){
      if(state.filterUser == "" && state.filterPriv == "" && state.filterStatus == "") {
        return true;
      }
      var itemsArray = [item[userColumn], item[privColumn], item[statColumn]];
      var filtersArray = [state.filterUser, state.filterPriv, state.filterStatus];
      if((state.filterOperator == 'And' && filterAllMatch(itemsArray, filtersArray)) || (state.filterOperator == 'Or' && filterAnyMatch(itemsArray, filtersArray)))
          return true;
      return false;
    })
  }
  filteredElements = () => {
    if(this.state.request == "UsersView")
      return this.filteredUsersElements();
    else
      return this.filteredHistoryElements();
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
    }
    const state = this.state;
    const i18n = state.i18n;
    const t = state.t;
    return (
      <View style={{ padding: 20, backgroundColor: '#ececec' , direction: i18n.dir()}}>
        {state.initialize? 
        <View>
        <ExcelExport data = {{'data' : [this.state.data['tableHead'], ...this.adjustExcelData(this.state.data['result'], this.state.tableHead)], 'request' : this.state.request, 't': t}}/>
        
        <View style={{flexDirection: 'row', paddingBottom: 10}}> <Text>{t("Filter")}</Text>
        <Text>  {t("User")}: </Text>
        <TextInput style={{borderWidth: 1, borderRadius: 5}} onChangeText={(newFilter) => {this.setState({filterUser: newFilter})}}/>
        
        {state.request == "historyView"?
        <View style={{flexDirection: 'row'}}>
        <Text> {t("Question")}: </Text>
        <TextInput style={{borderWidth: 1, borderRadius: 5}} onChangeText={(newFilter) => {this.setState({filterQues: newFilter})}}/>
        <Text> {t("Answer")}: </Text>
        <TextInput style={{borderWidth: 1, borderRadius: 5}} onChangeText={(newFilter) => {this.setState({filterAns: newFilter})}}/>
        </View>
        
        : 
        
        <View style={{flexDirection: 'row'}}>
        <Text> {t("Privileges")}: </Text>
        <TextInput style={{borderWidth: 1, borderRadius: 5}} onChangeText={(newFilter) => {this.setState({filterPriv: newFilter})}}/>
        <Text> {t("Status")}: </Text>
        <TextInput style={{borderWidth: 1, borderRadius: 5}} onChangeText={(newFilter) => {this.setState({filterStatus: newFilter})}}/>
        </View>
        
        }
        { /* Filter Operator */}
        <Text style={{alignSelf: 'center'}}> {t("Filter Operator")}: </Text>
        <TouchableOpacity onPress={() => this.setState({ filterOperator: 'And' })} style={{ marginHorizontal: 10, backgroundColor: this.state.filterOperator === 'And' ? '#b88d20' : '#f0f0f0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
          <Text style={{ color: this.state.filterOperator === 'And' ? '#fff' : '#000' }}>{t("And")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ filterOperator: 'Or' })} style={{ backgroundColor: this.state.filterOperator === 'Or' ? '#b88d20' : '#f0f0f0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
          <Text style={{ color: this.state.filterOperator === 'Or' ? '#fff' : '#000' }}>{t("Or")}</Text>
        </TouchableOpacity>
        { /* Filter Mode*/}
        <Text style={{alignSelf: 'center'}}> {t("Filter Mode")}: </Text>
        <TouchableOpacity onPress={() => this.setState({ filterMode: 'includes' })} style={{ marginHorizontal: 10, backgroundColor: this.state.filterMode === 'includes' ? '#b88d20' : '#f0f0f0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
          <Text style={{ color: this.state.filterMode === 'includes' ? '#fff' : '#000' }}>{t("includes")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ filterMode: 'starts with' })} style={{ backgroundColor: this.state.filterMode === 'starts with' ? '#b88d20' : '#f0f0f0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
          <Text style={{ color: this.state.filterMode === 'starts with' ? '#fff' : '#000' }}>{t("starts with")}</Text>
        </TouchableOpacity>

        </View>
        <TablePagination data={{'tableHead': state.tableHead, 'tableData' : this.filteredElements()}}/>
        </View>  : <View></View>}
      </View>
    )
  }
}