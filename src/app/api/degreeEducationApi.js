import { properties } from "../config/properties";
import { httprequest } from "asseco-commons";
import { createUrlWithPathParams } from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";


export const createDegreeEducation = (data) => {
    return httprequest({
      headers: headers,
      url: `${properties.api.root}/degree`,
      method: "POST",
      data: data ,
    }).then((response) => Promise.resolve(response));
};

export const getDegreeEducation = (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/degree/filter`,
            formData
        ),
        method: 'GET'
    }).then(response => Promise.resolve(response))
};

export const updateDegreeEducation = (degreeEducation) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/degree`,
        method: 'PUT',
        data: {...degreeEducation}
    })
        .then(response => Promise.resolve(response))
};

export const deleteDegreeEducation = (id) => {
    return httprequest({
      headers: headers,
      url: `${properties.api.root}/degree/${id}`,
      method: "DELETE",
    }).then((response) => Promise.resolve(response));
};
