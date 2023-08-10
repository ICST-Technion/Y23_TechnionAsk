import React from 'react';
import { View } from 'react-native';
import { CSVLink } from 'react-csv';

export default class ExcelExport extends React.Component {
    csvData = this.props.data['data'];
    filename = this.props.data['request'] == "historyView"? "HistoryData.csv" : "UsersData.csv";
    render(){
        return (
        <View>
            <CSVLink style={{marginBottom: 5}} data={this.csvData} filename={this.filename}>Export Data</CSVLink>
        </View>
        );
    }
  }