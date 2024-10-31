import { httprequest } from 'asseco-commons';
import { properties } from '../config/properties';
import {createUrlWithPathParams} from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const getProjects= (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/projects/filter`,
            formData
        ),
        method: 'GET'
    }).then(response => Promise.resolve(response))
};
export const getProjectsById = (id) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/projects/dosie/${id}`,
        method: 'GET'
    }).then(response => Promise.resolve(response))
};
export const createProjects = (projects) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/projects`,
        method: 'POST',
        data: {...projects}
    })
        .then(response => Promise.resolve(response))
};

export const deleteProjects = (row) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/projects/${row.id}`,
        method: 'DELETE'
    })
        .then(response => Promise.resolve(response))
};


export const updateProjects = (projects) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/projects/${projects.id}`,
        method: 'PUT',
        data: {...projects}
    })
        .then(response => Promise.resolve(response))
};
  
