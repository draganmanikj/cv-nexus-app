import { properties } from "../config/properties";
import { httprequest } from "asseco-commons";
import { createUrlWithPathParams } from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const createDocument = (document) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/documentoptions`,
    method: "POST",
    data: { ...document },
  }).then(response => Promise.resolve(response));
};

export const getDocuments = (formData) => {
  return httprequest({
    headers: headers,
    url: createUrlWithPathParams(
      `${properties.api.root}/documents/filter`,
      formData
    ),
    method: "GET",
  }).then((response) => Promise.resolve(response));
};

export const deleteDocuments = (item) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/documentoptions/${item.id}`,
    method: "DELETE",
  }).then((response) => Promise.resolve(response));
};

export const updateDocument = (document) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/documentoptions/${document.id}`,
    method: "PUT",
    data: { ...document },
  }).then(response => Promise.resolve(response))
};

export const getDocumentsByDosie = (dosieId) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/documentoptions/dosie/${dosieId}`,
    method: "GET",
  }).then((response) => Promise.resolve(response));
};

export const uploadDocument = (documentUrl) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/uploads/`,
    method: "PUT",
    data: { ...documentUrl },
  }).then((response) => Promise.resolve(response));
};

export const downloadDocument = (id) => {
  return httprequest( {
    headers: headers,
    url: `${properties.api.root}/documentoptions/download/${id}`,
    method: 'GET',
    responseType: "blob"
  }).then(response => Promise.resolve(response))
};
