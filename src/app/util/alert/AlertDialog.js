import React from "react";
import { Button, Dialog, DialogActions, DialogContent,  DialogTitle, DialogContentText } from "@mui/material";
import {useTheme} from "@mui/material";
import { translate } from "../lang/translate-wrapper";

const makeStyles = theme => ({
  customStyles: {
    backgroundColor: "#3e3e3e" ,
    color: "white"
  },
})


export default function AlertDialog(props) {
  const theme = useTheme()
  const styles = makeStyles(theme)
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle sx={styles.customStyles}>
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "black" }}>
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
              <Button
                onClick={() => {
                  props.config
                    ? props.onFunction(props.item, props.config)
                    : props.onFunction(props.item);
                  props.onClose();
                }}
                color="primary"
                variant="contained"
                autoFocus
              >
                {translate("app.generic.yes").toUpperCase()}
              </Button>
              <Button onClick={props.onClose} variant="contained" color="secondary" >
                {translate("app.generic.no").toUpperCase()}
              </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
