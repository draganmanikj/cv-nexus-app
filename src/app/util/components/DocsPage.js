import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { isAuthorized } from "asseco-commons";
import { translate } from "../lang/translate-wrapper";
import { KORISNICI, SUPERADMIN, OPERATORI } from "../userRoleConstants";
import GetAppIcon from '@mui/icons-material/GetApp';

export const DownloadLink = props => {
  return (
    <a
      href={props.src}
      download
      style={{ textDecoration: "none", color: "red", fontSize: "1rem" }}
    >
      {props.children}
    </a>
  );
}
  
export default function FormDialog(props) {
  const [fullWidth, setFullWidth] = useState(true);
  const { permissions } = useSelector(state => state.authorization);
  const isKorisnik = permissions && isAuthorized(permissions,[KORISNICI])
  const isOperator = permissions && isAuthorized(permissions,[SUPERADMIN, OPERATORI]) 

 return (
      <Dialog
        fullWidth={fullWidth}
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        sx={{
          "& a":{
            display: 'flex',
            alignItems: "center"
          },
          "& h5":{
            marginLeft: "0.5rem"
          }
        }}
      >
        <DialogTitle id="form-dialog-title" sx={{marginBottom: '1rem'}}>
          {translate("app.docs")}
        </DialogTitle >
        
        <DialogContent>   
          <Grid container sx={{textAlign: 'center'}} justifyContent="center">
            {(isKorisnik || isOperator) &&
            <>
              <Grid item xs={4}>
                {translate('app.usersManuals')}
                <ul style={{marginTop: '2rem', textAlign: 'left'}}>
                  <li style={{listStyleType: 'none'}}>
                    <DownloadLink src="./UserManual_RO_(Korisnici).pdf">
                      <GetAppIcon /><h5>{translate("app.mkManual")}</h5>
                    </DownloadLink>
                  </li>
                  <li style={{listStyleType: 'none'}}><h5>({translate("app.engManual")})</h5></li>
                  <li style={{listStyleType: 'none'}}><h5>({translate("app.albManual")})</h5></li>
                </ul>
              </Grid>
              <Grid item xs={4} sx={{borderLeft: '1px solid lightgray'}}>
                {translate('app.rules')}
                <ul style={{marginTop: '2rem', textAlign: 'left'}}>
                  <li style={{listStyleType: 'none'}}>
                    <DownloadLink src="./RO_PRAVILA_MK.pdf">
                      <GetAppIcon /><h5>{translate("app.mkRules")}</h5>
                    </DownloadLink>
                  </li>
                  <li style={{listStyleType: 'none'}}>
                    <DownloadLink src="./RO_PRAVILA_EN.pdf">
                      <GetAppIcon /><h5>({translate("app.enRules")})</h5>
                    </DownloadLink>
                  </li>
                  <li style={{listStyleType: 'none'}}>
                    <DownloadLink src="./RO_PRAVILA_Al.pdf">
                      <GetAppIcon /><h5>{translate("app.alRules")}</h5>
                    </DownloadLink>
                  </li>
                </ul>
              </Grid>
            </> 
            } 
            {isOperator && <Grid item xs={4} sx={{borderLeft: '1px solid lightgray'}}>
              {translate('app.operatorsManuals')}
              <ul style={{marginTop: '2rem', textAlign: 'left'}}>
                <li style={{listStyleType: 'none'}}>
                  <DownloadLink src="./UserManual_RO_(Operatori).pdf">
                  <GetAppIcon /><h5>{translate("app.mkManual")}</h5>
                  </DownloadLink>
                </li>
                <li style={{listStyleType: 'none'}}><h5>({translate("app.engManual")})</h5></li>
                <li style={{listStyleType: 'none'}}><h5>({translate("app.albManual")})</h5></li>
              </ul>
            </Grid>} 
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} variant="contained" color="secondary">
            {translate("app.generic.close")}
          </Button>
        </DialogActions>
      </Dialog>
   );
}
 





