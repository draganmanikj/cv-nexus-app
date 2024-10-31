import { httprequest } from 'asseco-commons';
import { properties } from '../config/properties';
import {createUrlWithPathParams} from "../util/helper/url-paths-params";

let headers = {};
headers["Accept-Language"] = "MK";

export const getTrainings= (formData) => {
    return httprequest({
        headers: headers,
        url: createUrlWithPathParams(
            `${properties.api.root}/trainings/filter`,
            formData
        ),
        method: 'GET'
    }).then(response => Promise.resolve(response))
};
export const getTrainingsById = (id) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/trainings/dosie/${id}`,
        method: 'GET'
    }).then(response => Promise.resolve(response))
};
export const createTrainings = (trainings) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/trainings`,
        method: 'POST',
        data: {...trainings}
    })
        .then(response => Promise.resolve(response))
};

export const deleteTrainings = (row) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/trainings/${row.id}`,
        method: 'DELETE'
    })
        .then(response => Promise.resolve(response))
};


export const updateTrainings = (trainings) => {
    return httprequest({
        headers: headers,
        url: `${properties.api.root}/trainings/${trainings.id}`,
        method: 'PUT',
        data: {...trainings}
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
  
  export const downloadObuka = (id) => {
    return httprequest( {
      headers: headers,
      url: `${properties.api.root}/trainings/download/obuka/${id}`,
      method: 'GET',
      responseType: "blob"
    }).then(response => Promise.resolve(response))
  };

  export const downloadCertificate = (id) => {
    return httprequest( {
      headers: headers,
      url: `${properties.api.root}/trainings/download/certificate/${id}`,
      method: 'GET',
      responseType: "blob"
    }).then(response => Promise.resolve(response))
  };
  




  
  