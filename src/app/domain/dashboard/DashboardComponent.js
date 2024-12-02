import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { isAuthorized } from "asseco-commons";
import { translate } from "../../util/lang/translate-wrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  KORISNICI,
  SUPERADMIN,
  OPERATORI,
  AUDIT,
} from "../../util/userRoleConstants";
import Logo from "../../util/images/logo.png"
import { useTheme } from "@emotion/react";
import "../../App.css"

export default function DashboardComponent({
}) {

  
  const dispatch = useDispatch();
  const theme = useTheme()

  const useStyles = () => ({
    formRoot: {
      "& .MuiGrid-item MuiGrid-grid-xs-4": {
        display: "flex",
        alignItems: "flex-end",
        "& .MuiFormControl-root": {
          marginBottom: "0",
          marginTop: "0",
          width: "100%",
        },
        "& input": {
          width: "100%",
        },
      },
      "& .MuiCardHeader-root":{
        padding: "16px 16px 0 16px"
      },
      "& .MuiCardContent-root":{
        padding: "8px 16px 16px 16px"
      }
    },
    boxImgBg: {
      backgroundClip: "padding-box !important",
      background: theme.palette.mode === "light" 
        ? `linear-gradient(0deg, rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.90)), url(${Logo})`
        : `linear-gradient(0deg, rgba(18, 18, 18, 0.60), rgba(18, 18, 18, 0.60)), url(${Logo})`,
      minHeight: "65vh",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain", 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px", 
    },
    root: {
      "& .MuiPaper-root":{
        backgroundColor: "transparent",
      },
    },
    title: {
      textAlign: "center",
      background: "linear-gradient(to bottom, transparent 50%, #cdc098 100%)",
      width: "fit-content",
      marginLeft: "auto",
      marginRight: "auto",
    },
    autoCompleteStyles: {
      paddingTop: "0 !important",
      '& .MuiFormControl-root':{
        margin: '0.5rem 0 0 0 !important',
        verticalAlign: 'top',
        "& input":{
          margin: "0 0 0 0.75rem !important",
        },
        "& svg":{
          fontSize: "20px"
        }
      },
      "& .MuiTypography-root":{
        marginLeft: "0.01rem !important",
        paddingLeft: "0.75rem"
      }
    },
    selectStyles: {
      "& .MuiFormControl-root":{
        marginTop: "0.5rem",
        marginBottom: 0,
      },
      "& .MuiSelect-select": {
        padding: "8px 14px 8px 10px",
        "& .MuiSelect-nativeInput": {
          bottom: "4px !important",
        },
      },
      "& label": {
        zIndex: "1111 !important",
        top: "-8px",
      },
      "& label.Mui-focused":{
        backgroundColor: "white !important",
        top: "0 !important",
        padding: "0 0.25rem!important",
      }
    },
    styledDropDownInput: {
      "& label": {
        backgroundColor: "white !important",
        top: 0,
        padding: "4px !important",
        zIndex: "1111 !important",
      },
    },
  });

  const classes = useStyles();

  return (
    <>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          maxWidth: "850px",
          borderRadius: "10px",
          border: "2px solid #00a3e0",
          width: "100%",
          textAlign: "center",
          backgroundColor: "#DCDCDC",
          boxShadow: "0 0 2px #00a3e0, 0 0 5px #00a3e0, 0 0 10px #00a3e0",
          animation: "glow 1.5s infinite ease-in-out",
          marginBottom: "2rem",
        }}
      >
        <CardHeader
          style={{}}
          title={
            <Grid
              container
              justifyContent="space-between"
            >
              <Grid
                item
                xs={12}
              >
                <Typography
                  variant="h6"
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {translate("app.dashboard.welcome")}
                </Typography>
              </Grid>
            </Grid>
          }
        />
        <CardContent
          style={{
            padding: "20px",
          }}
        >
          <Typography
            variant="body1"
            style={{ lineHeight: "1.6", fontSize: "16px" }}
          >
            {translate("app.dashboard.welcomeText")}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={classes.boxImgBg}>
        <Grid
          container
          sx={classes.root}
        ></Grid>
      </Box>
    </>
  );
}
