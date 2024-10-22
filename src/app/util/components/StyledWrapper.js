import React from 'react'
import { Grid } from '@mui/material'

const StyledWrapper = ({children, size, styles, widthRef, background, ...restProps}) => {
  return (
    <Grid xs={size} sx={{
      ...styles,
      marginTop: styles?.marginTop ? styles?.marginTop : styles?.marginTop === 0 ? 0 : "30px",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "2px",
      paddingTop: "2px",
      paddingRight: "2px",
      borderRadius: "7px",
      width: `${widthRef <= 15 ? widthRef * 100 : widthRef * 48}px`,
      ...(background !== false) && {background: "linear-gradient(to bottom, #c2002b, #b6a268, rgba(0, 0, 0, 0) 75%)"}
        
    }}
    {...restProps}
    >{children}</Grid>
  )
}

export default StyledWrapper