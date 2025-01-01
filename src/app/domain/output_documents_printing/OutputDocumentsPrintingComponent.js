import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Tooltip,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { translate } from "../../util/lang/translate-wrapper";
import { AssecoDataTable, FAutocomplete, FTextField } from "asseco-commons";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import LockScreenDialog from "../../util/lock/LockScreenDialog";
import OutputDocumentsDialog from "./OutputDocumentsDialog";
import { useDispatch } from "react-redux";
import operations from "./duck/operations";
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles ({
  root: {
    "& .MuiCardHeader-root": {
      padding: "1rem 1rem 0 1rem !important",
      "& .MuiGrid-container": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .MuiCardActions-root": {
          display: "flex",
        },
      },
    },
  },
  mlauto:{
    marginLeft: "auto"
  },
  gridMain: {
    marginLeft:"2rem",
  },
  flexEnd:{
    justifyContent:"flex-end"
  }
})

const OutputDocumentsPrintingComponent = ( {
    fetchDocuments,
    saveDocument,
    updateDocument,
    deleteDocument,
    resetDocuments,
    documents,
    loading,
  } ) => {
  const dispatch = useDispatch();
  const theme = useTheme();
const classes = useStyles();
  const [rerenderOutputDocuments, setRerenderPOutputDocuments] = useState(true);
  const [openDocumentsDialog, setOpenDocumentsDialog] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([]);

  const rerender = () => {
    setRerenderPOutputDocuments(rerenderOutputDocuments => !rerenderOutputDocuments);
    resetDocuments();
  };

  const initialValues = {};

  useEffect(() => {
    dispatch(operations.getDocumentType()).then((res) => setDocumentTypes(res));
  }, []);

  return (
    <>
    <Grid style={{ marginBottom: "15px" }} item xs={12}>
        {" "}
        <PrintIcon color={"primary"} style={{ fontSize: "25px" }} />{" "}
        <span style={{ fontSize: "25px", color: "#3452b4" }}>
          {" "}
          {translate("app.drawer.output_documents")}
        </span>
      </Grid>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            
            fetchDocuments(values);
          }}
          render={(formikProps) => (
            <Form autoComplete="off">
              <Card className={classes.root} style={{border:"2px solid #00a3e0", borderRadius:"5px"}}>
                  <CardHeader
                    title={
                      <Grid container justifyContent="space-between">
                        <Grid item xs={6}>
                      <Typography variant="h6">
                        {translate("app.drawer.searchDocuments")}
                      </Typography>
                      </Grid>
                      </Grid>
                    }
                  />
                <CardContent>
                  <Grid container spacing={1} key={rerenderOutputDocuments}>
                    <Grid item xs={3}>
                        <Field
                          name="name"
                          label={translate("app.requestOptions.description")}
                          component={FTextField}
                          margin="none"
                        />
                    </Grid>
                    <Grid item xs={3} >
                        <Field
                          name="templateType"
                          label={formikProps.values.templateType ? translate("app.drawer.outputDocumentType") : ""}
                          placeholder={translate("app.drawer.outputDocumentType")}
                          component={FAutocomplete}
                          options={documentTypes}
                          getOptionValue={(option) => option.id}
                          getOptionLabel={(option) => option.naziv}
                          margin="none"
                        />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions style={{position: "absolute"}}>
                  <Tooltip title={translate("app.generic.add")}>
                    <Button
                      size="small"
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() => setOpenDocumentsDialog({})}
                    >
                      <AddIcon />
                      {translate("app.generic.add")}
                    </Button>
                  </Tooltip>
                </CardActions>
                <CardActions className={classes.flexEnd}>
                  <Tooltip title={translate("app.generic.search")}>
                    <Button
                      size="small"
                      color="primary"
                      type="submit"
                      variant="outlined"
                    >
                      <SearchIcon />
                      {translate("app.generic.search")}
                    </Button>
                  </Tooltip>
                  <Tooltip title={translate("app.generic.clearFiltersButton")}>
                    <Button
                      size="small"
                      type="button"
                      variant="contained"
                      color="secondary"
                      disabled={!formikProps.isValid}
                      onClick={rerender}
                    >
                      <ClearAllIcon />
                      {translate("app.generic.clearFiltersButton")}
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Form>
          )}
        />
      <br />
      <LockScreenDialog open={loading} id="documentsLockScreenDialog" />
      {documents?.length > 0 && (
        <Grid style={{border:"2px solid #00a3e0", borderRadius:"5px", marginTop:"1rem"}}>
          <AssecoDataTable
            type="devExtreme"
            columns={[
              {
                name: "name",
                label: translate("app.requestOptions.description"),
              },
              {
                name: "templateType.naziv",
                label: translate("app.drawer.documentTypes"),
              },
            ]}
            sorting
            filtering
            columnResize
            data={documents}
            onEdit={(row) => {
              setOpenDocumentsDialog(row);
            }}
            onDelete={(row) => {
              if (window.confirm("Избриши?"))
                deleteDocument(row.id);
            }}
            tooltips={{
              edit: translate("app.generic.edit"),
              delete: translate("app.generic.delete"),
            }}
          />
        </Grid>
      )}

      {openDocumentsDialog && (
        <OutputDocumentsDialog
          open={openDocumentsDialog}
          onClose={() => setOpenDocumentsDialog(false)}
          saveDocument={saveDocument}
          updateDocument={updateDocument}
          documentTypes={documentTypes}
          loading={loading}
        />
      )}
    </>
  );
};

export default OutputDocumentsPrintingComponent;
