import { httprequest } from 'asseco-commons';
import { properties } from '../config/properties';
import {createUrlWithPathParams} from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const getWorkingPositionTypes = (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/workingPositionType/filter`,
            formData
        ),
        method: 'GET'
    }).then(response => Promise.resolve(response))
};

export const createWorkingPositionType = (workingPositionType) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/workingPositionType`,
        method: 'POST',
        data: {...workingPositionType}
    })
        .then(response => Promise.resolve(response))
};

export const deleteWorkingPositionType = (id) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/workingPositionType/${id}`,
        method: 'DELETE'
    })
        .then(response => Promise.resolve(response))
};


export const updateWorkingPositionType = (workingPositionType) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/workingPositionType`,
        method: 'PUT',
        data: {...workingPositionType}
    })
        .then(response => Promise.resolve(response))
};
