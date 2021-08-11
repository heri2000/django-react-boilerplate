import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper
} from "@material-ui/core";
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Draggable from 'react-draggable';

import { H_GetTranslation } from "./Libs";

import './Common.css';

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
  let variant = props.variant;
  if (variant === undefined) {
    variant = "contained";
  }
  return(
    <Button
      className="CommonButton"
      variant={variant}
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
  
  return(
    <DataGrid
      components={{ NoRowsOverlay: noRowsOverlay }}
      pageSize={25}
      checkboxSelection={true}
      density="compact"
      autoHeight={true}
      {...props}
    />
  );
}


const PaperComponent = (props) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export const CommonDraggableDialog = ({open, onClose, title, content, actions, maxWidth}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      maxWidth={maxWidth}
      fullWidth={true}
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  );
}
