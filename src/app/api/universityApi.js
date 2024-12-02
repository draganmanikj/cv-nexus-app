import { properties } from "../config/properties";
import { httprequest } from "asseco-commons";
import { createUrlWithPathParams } from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";


export const createUniversity = (data) => {
    return httprequest({
      headers: headers,
      url: `${properties.api.root}/university`,
      method: "POST",
      data: data ,
    }).then((response) => Promise.resolve(response));
  };


export const getUniversity = (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/university/filter`,
            formData
        ),
        method: 'GET'
    }).then(response => Promise.resolve(response))
};

export const updateUniversity = (university) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/university`,
        method: 'PUT',
        data: {...university}
    })
        .then(response => Promise.resolve(response))
};


export const deleteUniversity = (id) => {
    return httprequest({
      headers: headers,
      url: `${properties.api.root}/university/${id}`,
      method: "DELETE",
    }).then((response) => Promise.resolve(response));
};


