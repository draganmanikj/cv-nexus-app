import { properties } from "../config/properties";
import { httprequest } from "asseco-commons";
import { createUrlWithPathParams } from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";


export const createFaculty = (data) => {
    return httprequest({
      headers: headers,
      url: `${properties.api.root}/faculty`,
      method: "POST",
      data: data ,
    }).then((response) => Promise.resolve(response));
};

export const getFaculty = (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/faculty/filter`,
            formData
        ),
        method: 'GET'
    }).then(response => Promise.resolve(response))
};

export const updateFaculty = (faculty) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/faculty`,
        method: 'PUT',
        data: {...faculty}
    })
        .then(response => Promise.resolve(response))
};

export const deleteFaculty = (id) => {
    return httprequest({
      headers: headers,
      url: `${properties.api.root}/faculty/${id}`,
      method: "DELETE",
    }).then((response) => Promise.resolve(response));
};





