import { httprequest } from 'asseco-commons';
import { properties } from '../config/properties';
import {createUrlWithPathParams} from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const getEducation= (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/education/filter`,
            formData
        ),
        method: 'GET'
    }).then(response => Promise.resolve(response))
};
export const getEducationsById = (id) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/education/dosie/${id}`,
        method: 'GET'
    }).then(response => Promise.resolve(response))
};
export const createEducation = (education) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/education`,
        method: 'POST',
        data: {...education}
    })
        .then(response => Promise.resolve(response))
};

export const deleteEducation = (row) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/education/${row.id}`,
        method: 'DELETE'
    })
        .then(response => Promise.resolve(response))
};


export const updateEducation = (education) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/education/${education.id}`,
        method: 'PUT',
        data: {...education}
    })
        .then(response => Promise.resolve(response))
};

export const uploadDocument = (documentUrl) => {
    return httprequest({
      headers: headers,
      url: `${properties.api.root}/uploads/`,
      method: "PUT",
      data: { ...documentUrl },
    }).then((response) => Promise.resolve(response));
  };
  
  export const downloadDiploma = (id) => {
    return httprequest( {
      headers: headers,
      url: `${properties.api.root}/education/download/diploma/${id}`,
      method: 'GET',
      responseType: "blob"
    }).then(response => Promise.resolve(response))
  };
  export const downloadUverenie = (id) => {
    return httprequest( {
      headers: headers,
      url: `${properties.api.root}/education/download/uverenie/${id}`,
      method: 'GET',
      responseType: "blob"
    }).then(response => Promise.resolve(response))
  };
