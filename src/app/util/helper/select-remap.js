export const selectListFromJSONArray = (array, valueFieldName, labelFieldName) => {
    return array.map((item) => ({ label: item.user[labelFieldName], value: item.user[valueFieldName] }));
};