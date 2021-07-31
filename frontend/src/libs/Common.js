import { Button, TextField } from "@material-ui/core";
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

import { H_GetTranslation } from "./Libs";

export const APP_TITLE = "Boilerplate";
export const APP_TITLE_SEPARATOR = " | ";
export const APP_DEFAULT_LANG = "en";

export const getTabTitle = (moduleName) => {
  if (moduleName != null && moduleName !== "") {
    return moduleName + APP_TITLE_SEPARATOR + APP_TITLE;
  } else {
    return APP_TITLE;
  }
}

export const CommonButton = (props) => {
  return(
    <Button
      className="CommonButton"
      variant="contained"
      size="small"
      disableElevation
      {...props}
    >
        {props.children}
    </Button>
  );
}

export const CommonTextField = (props) => {
  return(
    <TextField
      variant="outlined"
      size="small"
      {...props}
    />
  );
}

export const CommonDataGrid = (props) => {
  const noRowsOverlay = () => {
    const translation = H_GetTranslation();
    return(
      <GridOverlay>{translation.global.noData}</GridOverlay>
    );
  }
  
  const useStyles = makeStyles({
    columnHeader: {
      backgroundColor: '#e0e0e0',
    }
  });
  const classes = useStyles();

  return(
    <DataGrid
      components={{ NoRowsOverlay: noRowsOverlay }}
      classes={{ columnHeader: classes.columnHeader }}
      pageSize={25}
      checkboxSelection={true}
      headerHeight={30}
      rowHeight={30}
      autoHeight={false}
      {...props}
    />
  );
}
