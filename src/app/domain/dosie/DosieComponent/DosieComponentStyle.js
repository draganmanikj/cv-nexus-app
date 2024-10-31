import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";

const dosieEditFormStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    personalInfoButtonGroup: {
        justifyContent: 'end'
    }
}));

export { dosieEditFormStyles };