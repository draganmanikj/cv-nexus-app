import React from "react";
import {
  Dialog,
  DialogContent,
} from "@mui/material"
import { LoadingComponent } from "asseco-commons";

export default function LockScreenDialog(props) {
  const { open } = props;

  return (
    <Dialog open={open} id={props.id ? props.id : "lockScreenDialog"}>
      <DialogContent
        sx={{ 
          color: "white",
          background:
          "linear-gradient(240deg, #0090e0 0%, #007ee0 70%, #006be0 100%);"
        }}>
        <LoadingComponent />
      </DialogContent>
    </Dialog>
  );
}
