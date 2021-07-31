import React from "react";

import {
  CommonButton,
  CommonTextField,
  CommonDataGrid,
  getTabTitle,
} from "../../libs/Common";
import { H_GetTranslation } from "../../libs/Libs";
import AppContainer from "../appContainer/AppContainer";

import '../../libs/Common.css';
import './User.css';

const User = () => {
  const translation = H_GetTranslation();
  document.title = getTabTitle(translation.user.moduleTitle);

  const userColumns = [
    {
      field: 'username',
      headerName: translation.user.username,
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: 'email',
      headerName: translation.user.email,
      minWidth: 250,
      flex: 1,
      editable: false,
    },
    {
      field: 'first_name',
      headerName: translation.user.firstName,
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: 'last_name',
      headerName: translation.user.lastName,
      minWidth: 150,
      flex: 1,
      editable: false,
    },
  ];

  const [userData, setRowData] = React.useState([
    // {
    //   id: 1,
    //   username: "admin",
    // }
  ]);

  return(
    <AppContainer title={translation.user.moduleTitle}>
    <div className="PageContent">
      <div className="FilterPanel">
        <CommonTextField
          className="FilterField"
          name="filter"
          label={translation.user.filterUserNamefirstNameLastNameEmail}
          autoFocus
        />
        <div>
          <CommonButton className="ShowRefreshButton">{translation.user.showRefresh}</CommonButton>
        </div>
      </div>
      <div className="ButtonPanel">
        <CommonButton>{translation.user.newUser}</CommonButton>
        <CommonButton>{translation.user.edit}</CommonButton>
      </div>
      <div className="DataPanel">
        <CommonDataGrid
          rows={userData}
          columns={userColumns}
        />
      </div>
    </div>
  </AppContainer>
  );
}

export default User;

/*
export default class User extends React.Component {
  render() {
    const translation = H_GetTranslation();
    document.title = getTabTitle(translation.user.moduleTitle);

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'firstName',
        headerName: 'First name',
        minWidth: 150,
        flex: 1,
        editable: false,
      },
      {
        field: 'lastName',
        headerName: 'Last name',
        minWidth: 150,
        flex: 1,
        editable: false,
      },
      {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: false,
      },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        minWidth: 160,
        flex: 2,
        valueGetter: (params) =>
          `${params.getValue(params.id, 'firstName') || ''} ${
            params.getValue(params.id, 'lastName') || ''
          }`,
      },
    ];

    const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 11, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 12, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 13, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 14, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 15, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 16, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 17, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 19, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 20, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 21, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 22, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 23, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 24, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 25, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 26, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 27, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 28, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 29, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 30, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 31, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 32, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 33, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 34, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 35, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 36, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 37, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 38, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 39, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 40, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 41, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 42, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 43, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 44, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 45, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 46, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 47, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 48, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 49, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 50, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 51, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 52, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 53, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 54, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 55, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 56, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 57, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 58, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 59, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 60, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 61, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 62, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 63, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 64, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 65, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 66, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 67, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 68, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 69, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 70, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 71, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 72, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 73, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 74, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 75, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 76, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 77, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 78, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 79, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 80, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 81, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 82, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 83, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 84, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 85, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 86, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 87, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 88, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 89, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 90, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 91, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 92, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 93, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 94, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 95, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 96, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 97, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 98, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 99, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 100, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 101, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 102, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 103, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 104, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 105, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 106, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 107, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 108, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 109, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 110, lastName: 'Snow', firstName: 'Jon', age: 35 },
    ];

    return (
      <AppContainer title={translation.user.moduleTitle}>
        <div className="PageContent">
          <div className="ButtonPanel">
            <CommonButton>{translation.user.newUser}</CommonButton>
            <CommonButton>{translation.user.edit}</CommonButton>
          </div>
          <div className="DataPanel">
            <DataGrid
              rows={rows}
              columns={columns}
              components={{
                NoRowsOverlay: noRowsOverlay,
              }}
              pageSize={25}
              checkboxSelection
              rowHeight={30}
              autoHeight={false}
            />
          </div>
        </div>
      </AppContainer>
    );
  }
}
*/
