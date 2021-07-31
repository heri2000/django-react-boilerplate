import TranslationEn from "../translations/en.json";
import TranslationId from "../translations/id.json";

export function H_GetTranslation(lang=null) {
  if (lang == null) lang = H_GetLangFromUrl();
  let translation = TranslationEn;
  if (lang === "id") translation = TranslationId;
  return translation;
}

export function H_IsLangAbbreviation(str) {
  if (Object.prototype.toString.call(str) === "[object String]") {
    if (
      str === "en" ||
      str === "id"
    ) return true;
  }
  return false;
}

export function H_GetLangFromUrl() {
  const pathName = window.location.pathname;
  const arrayPathName = pathName.split("/");
  if (arrayPathName.length > 1) {
    return arrayPathName[1];
  }
  return "";
}

export function H_GetRouteFromUrl() {
  const pathName = window.location.pathname;
  const arrayPathName = pathName.split("/");
  if (arrayPathName.length > 2) {
    return arrayPathName[2];
  }
  return "";
}

export function H_GetSubrouteFromUrl() {
  const pathName = window.location.pathname;
  const arrayPathName = pathName.split("/");
  if (arrayPathName.length > 3) {
    return arrayPathName[3];
  }
  return "";
}

export function H_GetRoutesArrayFromUrl() {
  const pathName = window.location.pathname;
  const arrayPathName = pathName.split("/");
  if (arrayPathName.length > 2) {
    arrayPathName.splice(0, 2);
    return arrayPathName;
  }
  return [];
}

export function H_GetRouteStringFromUrl() {
  const pathName = window.location.pathname;
  const arrayPathName = pathName.split("/");
  if (arrayPathName.length > 2) {
    arrayPathName.splice(0, 2);
    let routeString = "";
    for (let i=0; i < arrayPathName.length; i++) {
      routeString += "/" + arrayPathName[i];
    }
    return routeString;
  }
  return "";
}