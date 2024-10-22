import { properties } from "../config/properties";

import { httprequest } from "asseco-commons";

export const createItm = (item) => {
  return httprequest({
    url: `${properties.api.root}/example`,
    method: "post",
    data: item,
  }).then((response) => Promise.resolve(response));
};

export const deleteItm = (item) => {
  return httprequest({
    url: `${properties.api.root}/example/${item.id}`,
    method: "delete",
  }).then((response) => Promise.resolve(response));
};

export const updateItm = (item) => {
  return httprequest({
    url: `${properties.api.root}/example`,
    method: "put",
    data: item,
  }).then((response) => Promise.resolve(response));
};

export const fetchItms = () => {
  return httprequest({
    url: `${properties.api.root}/example`,
    method: "get",
  }).then((response) => Promise.resolve(response));
};
