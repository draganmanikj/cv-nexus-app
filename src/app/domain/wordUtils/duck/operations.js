import React from 'react'
import actions from "./actions";
import {generateTemplate, downloadFile} from "../../../api/wordGenerationApi";

const generateTemplateOp = (templateId, inputData) => {
    return (dispatch, getState) => {
        dispatch(actions.generateTemplateRequest());
        return generateTemplate(templateId.id, inputData)
            .then((resultData) => {
                const downloadUrl = window.URL.createObjectURL(new Blob([resultData]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', templateId.templatePath);
                document.body.appendChild(link);
                link.click();
                link.remove();

                dispatch(actions.generateTemplateSuccess(resultData));
                return Promise.resolve(resultData);
            })
            .catch((error) => {
                if(error.data){
                    error.data.text().then((text) => {
                        const res = JSON.parse(text);
                        dispatch(actions.generateTemplateFail(res));
                        return Promise.resolve(res);
                    })
                    return Promise.reject(error);
                }
                else return Promise.reject(error)
            });
    };
};

const downloadFileForTemplate = (templateId, fileName) => {
    return (dispatch, getState) => {
        return downloadFile(templateId)
            .then((response) => {
                const downloadUrl = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', fileName ? fileName : "test.docx");
                document.body.appendChild(link);
                link.click();
                link.remove();
                return Promise.resolve(response);
            })
            .catch((e) => {
                return Promise.reject(e);
            });
    };
};



export default {
    generateTemplateOp,
    downloadFileForTemplate,
}