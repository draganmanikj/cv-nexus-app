import { httprequest } from 'asseco-commons';
import { properties } from '../config/properties';
import {createUrlWithPathParams} from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const getLanguages= (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/languageDetails/filter`,
            formData
        ),
        method: 'GET'
    }).then(response => Promise.resolve(response))
};
export const getLanguagesById = (id) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/languageDetails/dosie/${id}`,
        method: 'GET'
    }).then(response => Promise.resolve(response))
};
export const createLanguages = (languageDetails) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/languageDetails`,
        method: 'POST',
        data: {...languageDetails}
    })
        .then(response => Promise.resolve(response))
};

export const deleteLanguages = (row) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/languageDetails/${row.id}`,
        method: 'DELETE'
    })
        .then(response => Promise.resolve(response))
};


export const updateLanguages = (languageDetails) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/languageDetails/${languageDetails.id}`,
        method: 'PUT',
        data: {...languageDetails}
    })
        .then(response => Promise.resolve(response))
};
  