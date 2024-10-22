import React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";

const GridBorderedContainer = (props) => {
  return (
    <Grid
      container
      style={{
        border: "1px solid lightgrey",
        borderRadius: "5px",
        paddingLeft: "15px",
        paddingRight: "15px",
        marginBottom: "35px",
        backgroundColor: "#fcfcfc",
        paddingBottom: "10px",
      }}
    >
      {props.title && (
        <span
          style={{
            display: "inline-block",
            marginTop: "-15px",
            backgroundColor: "white",
            padding: "3px",
            height: "25px",
            border: "1px solid lightgrey",
            borderRadius: "5px",
          }}
        >
          {props.title}
        </span>
      )}

      <Grid item xs={12}></Grid>
      {props.children}
    </Grid>
  );
};

GridBorderedContainer.propTypes = {
  title: PropTypes.string,
};

export default GridBorderedContainer;
