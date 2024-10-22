import React from "react";
import _ from "lodash";

export function renderAsString(val){
    if(_.isString(val))
        return val;
    else return <div>{val.label}</div>
}