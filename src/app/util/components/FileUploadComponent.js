import React from "react";
import { translate } from "../lang/translate-wrapper";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { FilePond, registerPlugin } from "react-filepond";
import { properties } from "../../config/properties";
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

export const APIUpload = {
  CONTEXT: properties.api.root,
  UPLOAD_REG: "/files/temp/upload",
  UPLOAD_MESS: "/files/temp/upload"
};

const FileUploadComponent = (
  {
  name,
  labelDragdrop,
  labelBrowse,
  documentType,
  maxFileSize,
  fileUploadType,
  fileType,
  labelMaxFileSize,
  formikProps,
  uploadRoute,
  setIsUpload,
  isLogged
}) => {
  registerPlugin(
    FilePondPluginFileValidateSize,
    FilePondPluginImagePreview,
    FilePondPluginImageValidateSize,
    FilePondPluginFileValidateType
  );


  return (
    <FilePond
      name={name}
      acceptedFileTypes={documentType}
      allowFileSizeValidation={true}
      maxFileSize={maxFileSize}
      labelFileTypeNotAllowed={translate(
        isLogged ? "app.fileUpload.invalidFormat" : "app.registracija.fileUpload.invalidFormat", {fileType: fileType}
      )}
      fileValidateTypeLabelExpectedTypes={translate(
        isLogged ? "app.fileUpload.possibleFileFormat" : "app.registracija.fileUpload.possibleFileFormat" , { fileUploadType: fileUploadType }
      )}
      labelIdle={`${labelDragdrop} <span className="filepond--label-action"> ${labelBrowse} </span>`}
      instantUpload={true}
      fullWidth
      margin="normal"
      labelButtonProcessItem="Upload"
      labelMaxFileSize={labelMaxFileSize}
      allowFileEncode
      labelFileProcessing={isLogged ? translate('app.fileUpload.uploading') : translate("app.registracija.fileUpload.uploading")}
      labelFileProcessingComplete={isLogged ? translate(`app.fileUpload.${name}`) :  translate(`app.registracija.fileUpload.${name}`)}
      labelTapToCancel={isLogged ? translate('app.fileUpload.tapToCancel') : translate('app.registracija.fileUpload.tapToCancel')}
      labelTapToRetry={isLogged ? translate('app.fileUpload.tapToRetry') : translate('app.registracija.fileUpload.tapToRetry')}
      labelTapToUndo={isLogged ? translate('app.fileUpload.tapToUndo') : translate('app.registracija.fileUpload.tapToUndo')}
      server={{
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
          const formData = new FormData()
          formData.append('file', file, file.name)
          const request = new XMLHttpRequest()
          request.open('POST', uploadRoute)
          request.send(formData)
          request.upload.onprogress = (e) => {
            progress(e.lengthComputable, e.loaded, e.total);
          };

          request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                if(uploadRoute.includes(APIUpload.UPLOAD_REG)) {
                  formikProps.setFieldValue(name, request.responseText)
                  if(name === 'tekovnaSostojba') {
                    setIsUpload(true)
                  }
                }
                load(request.responseText);
          }}

          
        },
        revert: (uniqueFileId = formikProps.value.name, load, error) => {
          formikProps.setFieldValue(name, undefined)
          name === "tekovnaSostojba" && setIsUpload(false)
          load()
        }
      }}
    />
  );
};

export default FileUploadComponent;
