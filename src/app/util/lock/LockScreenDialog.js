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
          background:"#3e3e3e"
        }}>
        <LoadingComponent />
      </DialogContent>
    </Dialog>
  );
}
