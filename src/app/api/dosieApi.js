import { httprequest } from "asseco-commons";
import { properties } from "../config/properties";
import { createUrlWithPathParams } from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const getDosies = () => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/dossier`,
    method: "GET",
  }).then((response) => Promise.resolve(response));
};

export const removeDosie = (id) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/dossier/${id}`,
    method: "DELETE",
  }).then((response) => Promise.resolve(response));
};

export const saveDosie = (dosie) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/dossier`,
    method: "POST",
    data: { ...dosie },
  }).then((response) => Promise.resolve(response));
};

export const editDosie = (dosie) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/dossier/${dosie.id}`,
    method: "PUT",
    data: { ...dosie },
  }).then((response) => Promise.resolve(response));
};

// export const getDosieByUser = (id) => {
//   return httprequest({
//     headers: headers,
//     url: `${properties.api.root}/dossier/user/${id}`,
//     method: "GET",
//   }).then((response) => Promise.resolve(response));
// };
export const getDosieByUser = (username) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/dossier/user/byUsername/${username}`,
    method: "GET",
  }).then((response) => Promise.resolve(response));
};

export const getFilterUsers = (formData) => {
  return httprequest({
    headers: headers,
    url: createUrlWithPathParams(
      `${properties.api.root}/dossier/filter`,
      formData
    ),
    method: "GET",
  }).then((response) => Promise.resolve(response));
};
export const getDosiesNotInTypeReqId = (typeRequestId) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/dossier/not-in/${typeRequestId}/users`,
    method: "GET",
  }).then((response) => Promise.resolve(response));
};

export const getDosiesForTypeRequest = (typeRequest) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/request/filter?typeRequest.id=${typeRequest.id}`,
    method: "GET",
  }).then((response) => Promise.resolve(response));
};

export const workFlow = (id) => {
  return httprequest({
    headers: headers,
    // url: `${properties.api.root}/request/dossier/${id}`,
    url: `${properties.api.root}/request`,
    method: "GET",
  }).then((response) => Promise.resolve(response));
};

export const requestDetails = (id) => {
  return httprequest({
    headers: headers,
    // url: `${properties.api.root}/request/dossier/${id}`,
    url: `${properties.api.root}/requestdetails`,
    method: "GET",
  }).then((response) => Promise.resolve(response));
};


