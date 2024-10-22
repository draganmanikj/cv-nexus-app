import React, {useState} from 'react';
import { IconButton, Box } from '@mui/material';
import { KeyboardArrowUpRounded } from '@mui/icons-material';
  
const SrollToTopButton = () => { 
  
  const [visible, setVisible] = useState(false)

  const STYLES = {
    btnStyles: { 
      position: "fixed",
      textAlign: "center",
      right: "1rem",
      bottom: "24px",
      height: "40px",
      width: "40px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",      
      fontSize: "3rem",
      zIndex: "1",
      cursor: "pointer",
      backgroundColor: "lightGrey",
      opacity: "0.7",
      "&:hover":{
        backgroundColor: "#2f3f4c",
        "& svg":{
          color: "#fff"
        }
      }
    },
    iconStyles: {
      verticalAlign: "middle",
      display: visible ? 'inline' : 'none',
    }
  }
  
  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  }; 
  
  window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop
    scrolled > 300 ? setVisible(true) : setVisible(false) 
  }); 
  
  return (
    <>
      {
        visible && 
        <Box sx={STYLES.btnStyles} onClick={scrollToTop}>
          <IconButton sx={{padding: "0", width: "100%"}}>
            <KeyboardArrowUpRounded sx={STYLES.iconStyles}/>
          </IconButton>
        </Box>
      }
    </>
  ); 
} 

export default SrollToTopButton