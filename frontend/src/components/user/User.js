import React from "react";
import { DataGrid } from '@material-ui/data-grid';
// import { BasicTable } from "../../utils/BasicTable";

import {
  CommonButton,
  getTabTitle,
} from "../../utils/Common";
import { H_GetTranslation } from "../../libs/Libs";
import AppContainer from "../appContainer/AppContainer";

import '../../utils/Common.css';
import './User.css';

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
];

export default class User extends React.Component {
  render() {
    let translation = H_GetTranslation();
    document.title = getTabTitle(translation.user.moduleTitle);
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
              pageSize={10}
              checkboxSelection
              rowHeight={30}
            />
          </div>
        </div>
      </AppContainer>
    );
  }
}