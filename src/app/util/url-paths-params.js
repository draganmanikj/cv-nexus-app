// This is explicitly used for the /filter endpoints that use QueryDSL.
// These endpoints require that all request parameters are sent with their correct paths within the object
// Additionally when dates are sent they can be sent as one parameter (to search for a specific date),
// or as two parameters (to search for a period between two boundaries) with both of them having the same parameter name added sequentially.
// In the case where there are two dates it is expected that their object property names have "_from" or "_to" appended to them so that the algorithm recognizes each and add them to the url in order.

import _ from "lodash";
import {isMoment} from "moment";

export function createUrlWithPathParams(url, data) {
    const urlpath = new URL(url);
    const objectPaths = propertyPathsToArray(data)
    let fromDatesPaths = [];
    let toDatesPaths = [];

    objectPaths.forEach(path => {
        const prop = _.get(data, path);
        if(prop !== undefined && prop !== null){
            if(isMoment(prop)){
                if(path.endsWith("_from")){
                    fromDatesPaths = [...fromDatesPaths, path]
                } else if(path.endsWith("_to")){
                    toDatesPaths = [...toDatesPaths, path]
                } else {
                    // This part here is specific for this application because every entity has a seperate date-from and date-to field
                    // And in order to simulate the same thing but with two seperate fields this is done
                    //------------------------------------------------------------------------------------------------------------
                    if(path.endsWith("datumOd")){
                        urlpath.searchParams.append(path, prop.startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS"))
                    } else if(path.endsWith("datumDo")){
                        urlpath.searchParams.append(path, prop.endOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS"))
                    } else {
                        urlpath.searchParams.append(path, prop.startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS"))
                    }
                    //------------------------------------------------------------------------------------------------------------
                }
            } else {
                urlpath.searchParams.append(path, prop)
            }
        }
    })

    if(fromDatesPaths.length !== 0 && toDatesPaths.length !== 0 && fromDatesPaths.length === toDatesPaths.length){
        fromDatesPaths.forEach(path => {
            let fromDate = _.get(data, path);
            urlpath.searchParams.append(path.replace("_from", ""), fromDate.startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS"))
        })

        toDatesPaths.forEach(path => {
            let toDate = _.get(data, path);
            urlpath.searchParams.append(path.replace("_to", ""), toDate.endOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS"))
        })
    }

    return urlpath;
}

export function propertyPathsToArray(obj) {
    const addDelimiter = (a, b) => a ? `${a}.${b}` : b;

    const paths = (obj = {}, head = '') => {
        return Object.entries(obj)
            .reduce((product, [key, value]) => {
                let fullPath = addDelimiter(head, key)
                if(isMoment(value))
                    return product.concat(fullPath)
                return _.isObject(value) ?
                    product.concat(paths(value, fullPath))
                    : product.concat(fullPath)
            }, []);
    }

    return paths(obj);
}