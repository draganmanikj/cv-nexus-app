import { properties } from "../config/properties";
import { httprequest } from "asseco-commons";
import { createUrlWithPathParams } from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const createCountry = (data) => {
    return httprequest({
      headers: headers,
      url: `${properties.api.root}/drzava`,
      method: "POST",
      data: data ,
    }).then((response) => Promise.resolve(response));
  };


export const getCountry = (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/drzava/filter`,
            formData
        ),
        method: 'GET'
    }).then(response => Promise.resolve(response))
  };

export const updateCountry = (country) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/drzava`,
        method: 'PUT',
        data: {...country}
    })
        .then(response => Promise.resolve(response))
};

export const deleteCountry = (id) => {
    return httprequest({
      headers: headers,
      url: `${properties.api.root}/drzava/${id}`,
      method: "DELETE",
    }).then((response) => Promise.resolve(response));
};