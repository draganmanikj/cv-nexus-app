import { createTheme } from '@mui/material/styles';

function customTheme () {
    let theme = createTheme({
        palette: {
            primary: {
                main: '#cc8fd6',
            },
            secondary: {
                main: '#00a3e0',
            },
        },
    });

    theme = createTheme(theme, {
        palette: {
            info: {
                main: theme.palette.secondary.main,
            },
        },
    });

    return theme;
    // return createTheme({
    //
    //     overrides: {
    //         MuiCardHeader: {
    //
    //             root: {
    //                 padding: "4px 4px 0px 8px !important"
    //
    //             },
    //             title: {
    //                 fontSize: "1rem !important",
    //                 opacity: 0.5
    //             },
    //             subheader: {
    //                 fontSize: "1rem !important",
    //                 opacity: 0.5
    //             }
    //
    //         },
    //         MuiTabs: {
    //             root: {
    //                 minHeight: "24px",
    //
    //             }
    //         },
    //
    //         MuiTab: {
    //
    //             root: {
    //                 fontSize: '0.75rem',
    //                 minHeight: "24px",
    //
    //             }
    //
    //         },
    //         MuiInputLabel: {
    //             root: {
    //                 fontSize: "0.9rem",
    //                 color: "rgba(0,0,0,0.9)"
    //             }
    //         },
    //         MuiTypography: {
    //             body1: {
    //                 fontSize: "0.9rem",
    //             }
    //         },
    //         MuiTableRow: {
    //             root: {
    //                 "&:nth-child(odd)": {
    //                     backgroundColor: "#F4F4F4",
    //                 },
    //                 "&:nth-child(even)": {
    //                     backgroundColor: "#FEFEFF",
    //                 },
    //             },
    //             head: {
    //                 backgroundColor: "#FFFFFF !important",
    //             },
    //             footer: {
    //                 backgroundColor: "#FFFFFF !important",
    //             },
    //         },
    //         MuiTableCell: {
    //             root: {
    //                 padding: "0px 24px 0px 16px !important"
    //             }},
    //         MuiInputBase: {
    //             input: {
    //                 height: "15px",
    //                 fontSize: "14px",
    //             },
    //             root: {
    //                 color: "black",
    //                 "&$disabled": {
    //                     color: "rgba(0, 0, 0,1)"
    //                 }
    //             }
    //         },
    //         MuiButton: {
    //             root: {
    //                 //color: "black",
    //                 "&$disabled": {
    //                     color: "rgba(0, 0, 0,0.65)"
    //                 }
    //             }
    //
    //         },
    //         MuiDialog: {
    //             paperScrollPaper: {
    //                 maxHeight: "calc(100% - 20px)",
    //             },
    //         },
    //         MuiOutlinedInput: {
    //             inputMarginDense: {
    //                 paddingTop: "5px",
    //                 paddingBottom: "5px",
    //                 paddingLeft: "8px",
    //                 paddingRight: "8px",
    //             },
    //             multiline: {
    //                 paddingTop: "5px",
    //                 paddingBottom: "5px",
    //                 paddingLeft: "8px",
    //                 paddingRight: "8px",
    //             },
    //             adornedEnd: {
    //                 paddingRight: "0px",
    //             },
    //         },
    //         PrivateSwitchBase: {
    //             root: {
    //                 padding: "5px",
    //             }
    //         }
    //     },
    //     palette: {
    //         primary: { main: "#01579b" },
    //         secondary: { main: "#a76279" },
    //     },
    // });
}

export default customTheme;