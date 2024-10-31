import { httprequest } from 'asseco-commons';
import { properties } from '../config/properties';
import {createUrlWithPathParams} from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const getWorkingPositions = (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/workingPosition/filter`,
            formData
        ),
        method: 'GET'
    }).then(response => Promise.resolve(response))
};
export const getWorkingPositionsById = (id) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/workingPosition/dosie/${id}`,
        method: 'GET'
    }).then(response => Promise.resolve(response))
};
export const createWorkingPosition = (workingPosition) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/workingPosition`,
        method: 'POST',
        data: {...workingPosition}
    })
        .then(response => Promise.resolve(response))
};

export const deleteWorkingPosition = (id) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/workingPosition/${id}`,
        method: 'DELETE'
    })
        .then(response => Promise.resolve(response))
};


export const updateWorkingPosition = (workingPosition) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/workingPosition/${workingPosition.id}`,
        method: 'PUT',
        data: {...workingPosition}
    })
        .then(response => Promise.resolve(response))
};
