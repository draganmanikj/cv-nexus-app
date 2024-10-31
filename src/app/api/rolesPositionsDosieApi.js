import { httprequest } from 'asseco-commons';
import { properties } from '../config/properties';
import {createUrlWithPathParams} from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const getRolesPositions = (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/rolesPositions/filter`,
            formData
        ),
        method: 'GET'
    }).then(response => Promise.resolve(response))
};
export const getRolesPositionsById = (id) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/rolesPositions/dosie/${id}`,
        method: 'GET'
    }).then(response => Promise.resolve(response))
};
export const createRolesPosition = (rolesPosition) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/rolesPositions`,
        method: 'POST',
        data: {...rolesPosition}
    })
        .then(response => Promise.resolve(response))
};

export const deleteRolesPosition = (id) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/rolesPositions/${id}`,
        method: 'DELETE'
    })
        .then(response => Promise.resolve(response))
};


export const updateRolesPosition = (rolesPosition) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/rolesPositions/${rolesPosition.id}`,
        method: 'PUT',
        data: {...rolesPosition}
    })
        .then(response => Promise.resolve(response))
};
