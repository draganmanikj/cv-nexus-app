import { properties } from "../config/properties";
import { httprequest } from "asseco-commons";
import { createUrlWithPathParams } from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const createRolePosition = (data) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/rolesPositionTypes`,
    method: "POST",
    data: data ,
  }).then((response) => Promise.resolve(response));
};

export const getRolePosition = (formData) => {
  return httprequest({
      headers: headers,
      url: createUrlWithPathParams(
          `${properties.api.root}/rolesPositionTypes/filter`,
          formData
      ),
      method: 'GET'
  }).then(response => Promise.resolve(response))
};


export const updateRolePosition = (rolePosition) => {
  return httprequest({
      headers: headers,
      url: `${properties.api.root}/rolesPositionTypes`,
      method: 'PUT',
      data: {...rolePosition}
  })
      .then(response => Promise.resolve(response))
};

export const deleteRolePosition = (id) => {
  return httprequest({
    headers: headers,
    url: `${properties.api.root}/rolesPositionTypes/${id}`,
    method: "DELETE",
  }).then((response) => Promise.resolve(response));
};
