import moment from "moment";

export const makeArrayAssociative = (array,keyFieldName="id") => {

    let aArr = {};

    array.forEach((elem)=>{
        aArr[elem[keyFieldName]] = elem;
    })

    return aArr;
};

export const appendDates = (datumOd, datumDo) => {
    if(datumOd && datumDo)
        return `datumOd=${datumOd}&datumDo=${moment(datumDo).endOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS")}`
    else if(datumOd)
        return `datumOd=${datumOd}`
    else if(datumDo)
        return `datumDo=${moment(datumDo).endOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS")}`
    else
        return `datumOd=${moment().startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS")}&datumDo=${moment().endOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS")}`
}


export const renderDateAsString = (dateString) => {
    return dateString ? moment(dateString).format("DD.MM.YYYY") : null;
}

export const renderDateTimeAsString = (dateTimeString) => {
    return dateTimeString ? moment(dateTimeString).format("DD.MM.YYYY HH:mm") : null;
}

export const renderStatus = (status) => {
    
}