import { Button } from "@material-ui/core";

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
    <Button className="CommonButton" variant="contained" disableElevation>{props.children}</Button>
  );
}