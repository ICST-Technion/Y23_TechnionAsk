import React from 'react';
import { View } from 'react-native';
import { CSVLink } from 'react-csv';

export default class ExcelExport extends React.Component {
    csvData = this.props.data['data'];
    filename = this.props.data['request'] == "historyView"? "HistoryData.csv" : "UsersData.csv";
    t = this.props.data['t'];
    render(){
        return (
        <View>
            <CSVLink style={{marginBottom: 5}} data={this.csvData} filename={this.filename}>{this.t("Export Data")}</CSVLink>
        </View>
        );
    }
  }