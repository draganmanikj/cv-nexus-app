import { properties } from "../config/properties";
import { httprequest } from "asseco-commons";
import { createUrlWithPathParams } from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";


export const createTypeArea = (data) => {
    return httprequest({
      headers: headers,
      url: `${properties.api.root}/areatype`,
      method: "POST",
      data: data ,
    }).then((response) => Promise.resolve(response));
};

export const getTypeArea = (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/areatype/filter`,
            formData
        ),
        method: 'GET'
    }).then(response => Promise.resolve(response))
};

export const updateTypeArea = (typeArea) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/areatype`,
        method: 'PUT',
        data: {...typeArea}
    })
        .then(response => Promise.resolve(response))
};


export const deleteTypeArea = (id) => {
    return httprequest({
      headers: headers,
      url: `${properties.api.root}/areatype/${id}`,
      method: "DELETE",
    }).then((response) => Promise.resolve(response));
};
