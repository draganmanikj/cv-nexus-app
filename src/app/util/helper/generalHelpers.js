import React from "react";
import moment from "moment";

export const  renderDateCustomCell = (dateValue) => {
    var newDateString = moment(dateValue, "YYYY-MM-DD").format(
      "DD.MM.YYYY"
    );
    return dateValue ? newDateString : null;
  }