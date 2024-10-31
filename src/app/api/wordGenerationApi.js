import { properties } from "../config/properties";
import { httprequest } from "asseco-commons";
import { createUrlWithPathParams } from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const generateTemplate = (templateId, inputData) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/templates/generate/${templateId}`,
        method: "PUT",
        data: { ...inputData },
        responseType: "blob"
    }).then((response) => Promise.resolve(response));
};

export const getDokumenti = (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/templates/filter`,
            formData
        ),
        method: "GET",
    }).then((response) => Promise.resolve(response));
};

export const updateDokumentiApiCall = (doc) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/templates/update`,
        method: "PUT",
        data: { ...doc },
    }).then((response) => Promise.resolve(response));
};

export const createDokumentiApiCall = (doc) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/templates`,
        method: "POST",
        data: { ...doc },
    }).then((response) => Promise.resolve(response));
};

export const deleteDokumentiApiCall = (templateId) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/templates/${templateId}`,
        method: "DELETE",
    }).then((response) => Promise.resolve(response));
};


export const getParametersForSqlApiCall = (templateId) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/templates/getParametars/${templateId}`,
        method: "GET",
    }).then((response) => Promise.resolve(response));
};

export const downloadFile = (templateId) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/templates/download/${templateId}`,
        method: 'GET',
        responseType: "blob"
    }).then(response => Promise.resolve(response))
};