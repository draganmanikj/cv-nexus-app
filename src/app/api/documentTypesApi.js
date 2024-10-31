import { httprequest } from "asseco-commons";
import { properties } from "../config/properties";
import { createUrlWithPathParams } from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const getDocumentTypes = (formData) => {
  return httprequest({
    headers: headers,
    url: createUrlWithPathParams(
      `${properties.api.root}/documentType/filter`,
      formData
    ),
    method: "GET",
  }).then((response) => Promise.resolve(response));
};

export const createDocumentType = (documentType) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/documentType`,
    method: "POST",
    data: { ...documentType },
  }).then((response) => Promise.resolve(response));
};

export const deleteDocumentType = (id) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/documentType/${id}`,
    method: "DELETE",
  }).then((response) => Promise.resolve(response));
};

export const updateDocumentType = (documentType) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/documentType/${documentType.id}`,
    method: "PUT",
    data: { ...documentType },
  }).then((response) => Promise.resolve(response));
};
