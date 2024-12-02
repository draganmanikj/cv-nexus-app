import { httprequest } from "asseco-commons";
import { properties } from "../config/properties";
import { createUrlWithPathParams } from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const getLanguagesType = (formData) => {
  return httprequest({
    headers: headers,
    url: createUrlWithPathParams(
      `${properties.api.root}/language/filter`,
      formData
    ),
    method: "GET",
  }).then((response) => Promise.resolve(response));
};

export const createLanguagesType = (language) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/language`,
    method: "POST",
    data: { ...language },
  }).then((response) => Promise.resolve(response));
};

export const deleteLanguagesType = (id) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/language/${id}`,
    method: "DELETE",
  }).then((response) => Promise.resolve(response));
};

export const updateLanguagesType = (language) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/language/${language.id}`,
    method: "PUT",
    data: { ...language },
  }).then((response) => Promise.resolve(response));
};
