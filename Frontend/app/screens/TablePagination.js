import * as React from 'react';
import { DataTable, DefaultTheme } from 'react-native-paper';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

const secShade = '#b88d20';

const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: secShade, // Change this to the desired color for the pagination buttons
    },
  };

const numberOfItemsPerPageList = [10, 20, 30];

const TablePagination = ({ data }) => {
    const headers = data['tableHead'];

    const items = data['tableData'];
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);
    
    React.useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);
  
    const tableHeader = (header) => (
        <DataTable.Title textStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }}>{header}</DataTable.Title>
    );
    
    const tableRow = (item) => (
        <DataTable.Row style={{ textAlign: 'center', writingDirection: 'auto', borderBottomColor: secShade }}>
        {item.map((value) => (
            <DataTable.Cell textStyle={{ color: '#000' }}>
            {value}
            </DataTable.Cell>
        ))}
        </DataTable.Row>
    );
    
    return (
        <View>
            <PaperProvider theme={myTheme}>
                <DataTable style={{ borderColor: secShade, borderWidth: 2, marginBottom: 225 }}>
                <DataTable.Header style={{borderBottomColor: secShade}}>
                    {headers.map((header) => tableHeader(header))}
                </DataTable.Header>

                {items
                    .slice(
                    page * numberOfItemsPerPage,
                    page * numberOfItemsPerPage + numberOfItemsPerPage
                    )
                    .map((row) => tableRow(row))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${items.length}`}
                    showFastPaginationControls
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    selectPageDropdownLabel={'Rows per page'}
                />
                </DataTable>
            </PaperProvider>
        </View>
    );
};

export default TablePagination;
