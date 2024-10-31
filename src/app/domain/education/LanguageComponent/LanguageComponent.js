import React, { useState } from 'react';
import {
    Button,
    Paper,
    Grid,
    Typography,
    Tooltip,
  } from "@mui/material";
import {translate} from "../../../util/lang/translate-wrapper";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import AlertDialog from '../../../util/alert/AlertDialog';
import AddIcon from "@mui/icons-material/Add";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import AddLanguageDialog from './AddLanguageDialog';
import LanguageTable from './LanguageTable';
import LanguageIcon from '@mui/icons-material/Language';
import operationsLanguages from "./duck/operations"

const useStyles = makeStyles ((theme) => ({ 
    heading: {
        height: "30px !important",
        "& .MuiSvgIcon-root":{
            fontSize: "20px !important",
            marginRight: "1rem !important"
        },
        "& span":{
            fontSize: "20px",
            color: "#3452b4",
        }
    },
    mb035r: {
        marginBottom: "0.35rem"
    }
 }))

const LanguageComponent = (props) => {
    const theme = useTheme();
const classes = useStyles();
    const [add, setAdd] = useState();
    const [edit, setEdit] = useState();
    const [deleteDialog, setdeleteDialog] = useState();
    const [selectedRow, setSelectedRow] = useState();
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const { languages } = useSelector((state) => state?.languages);
    const dispatch = useDispatch();

      function openDialog(dialog, row) {
        if (dialog === "add") {
          setAdd(true);
          setSelectedRow(false);
        } else if (dialog === "edit") {
          setEdit(true);
          setSelectedRow(row);
        } else if (dialog === "deleteDialog") {
          setdeleteDialog(true);
          setSelectedRow(row);
        }
      }
      function save(item) {
        if (item.id)
          dispatch(operationsLanguages.updateLanguagesOp(item)).then((res) => {
            closeDialog("edit");
          });
        else
          dispatch(operationsLanguages.createLanguagesOp(item)).then((res) => {
            closeDialog("add");
          });
      }

      const deleteMessage = (item) => {
        dispatch(operationsLanguages.deleteLanguagesOp(item))
      }
      function closeDialog(dialog) {
        if (dialog === "add") setAdd(false);
        else if (dialog === "edit") setEdit(false);
        else if (dialog === "deleteDialog") setdeleteDialog(false);
      }

    return (
        <>
      <Grid container justifyContent="space-between" alignItems="center">
            <Grid className={classes.heading} item xs={6}>
                    <LanguageIcon color={"primary"} className={classes.mb035r}/>
                        <span>
                            {translate("app.dosie.other.languages")}
                        </span>
            </Grid>
          <Tooltip title={translate("app.generic.add")} >
            <Button
              size="small"
              type="button"
              variant="contained"
              color="primary"
              marginLeft="auto"
              onClick={() => openDialog("add", {})}
            >
              <AddIcon />
              {translate("app.generic.add")}
            </Button>
          </Tooltip>
      </Grid>

      {languages?.length > 0 && (
        <LanguageTable
          data={languages}
          onEdit={(item) => {
            openDialog("edit", item);
          }}
          onAdd={() => {
            openDialog("add", {});
          }}
          onDelete={(item) => {
            openDialog("deleteDialog", item);
          }}
        />
      )}

      {(languages === undefined || languages.length === 0) && (
        <Grid
          style={{ marginTop: "2rem", textAlign: "center"}}
          container
          spacing={3}
        >
          <Grid item xs={12}>
            <Paper style={{ paddingBottom: 10 + "px", paddingTop: 10 + "px", width: "100%" }}>
              <LayersClearIcon />
              <Typography component="h5" variant="h6" color="inherit" noWrap>
                {translate("app.dosie.other.noResult")}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}

      {add && (
        <AddLanguageDialog
          open={add}
          onClose={() => {
            closeDialog("add");
          }}
          dosie={props.dosie}
          item={selectedRow}
          save={save}
        />
      )}

      {edit && (
        <AddLanguageDialog
          open={edit}
          onClose={() => {
            closeDialog("edit");
          }}
          save={save}
          item={selectedRow}
          dosie={props.dosie}
        />
      )}

      {deleteDialog && (
        <AlertDialog
          id={"projectsDeleteDialog"}
          open={deleteDialog}
          item={deleteDialog}
          onClose={() => setdeleteDialog(false)}
          onCloseYes={() => setdeleteDialog(false)}
          onFunction={() => deleteMessage(selectedRow)}
          text={translate("app.notifications.deleteConfirm")}
        />
      )}

      {openAlertDialog && (
        <AlertDialog
          id={"projectsAlertDialog"}
          open={openAlertDialog}
          item={openAlertDialog}
          onClose={() => setOpenAlertDialog(false)}
          onCloseYes={() => setOpenAlertDialog(false)}
          onFunction={(item) => save(item)}
          text={translate("app.notifications.saveConfirm")}
        />
      )}

    </>
            
    )
}
export default LanguageComponent;