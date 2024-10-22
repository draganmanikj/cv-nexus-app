import React, { useState, useEffect } from "react";
import { Paper, TableCell, TextField } from "@mui/material";
import { Template, TemplatePlaceholder } from "@devexpress/dx-react-core";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableColumnVisibility,
  TableColumnResizing,
  Toolbar,
  ColumnChooser,
} from "@devexpress/dx-react-grid-material-ui";
import {
  FilteringState,
  SortingState,
  PagingState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSorting,
  DataTypeProvider,
} from "@devexpress/dx-react-grid";
import _ from "lodash";
import { translate } from "../../lang/translate-wrapper";
import ActionsColumn from "../../../domain/dashboard/plugin/actionColumn"
import ExportMenu from "asseco-commons/dist/utils/datatable/exporter/ExportMenu";
import ExportItems from "asseco-commons/dist/utils/datatable/exporter/ExportItems";
import exportService from "asseco-commons/dist/utils/datatable/exporter/exportService";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import Group from "@mui/icons-material/Group";
import PrintIcon from '@mui/icons-material/Print';
import PropTypes from "prop-types";
import PrintDialog from "../../../domain/invitations/PrintDialog";
import { sittingDescTypeEnum, invitationStatusEnum } from "../../enum/enum";

const useStyles = () => ({
    tableStyles: {
      "& .MuiSelect-icon": {
        left: "0.65rem",
        top: 0,
      },
      "& th.MuiTableCell-root .MuiInputBase-input": {
        padding: "3px 0 7px 4px !important",
      },
      "& .MuiInputAdornment-positionEnd .MuiButtonBase-root": {
        paddingRight: "0 !important",
        paddingLeft: "0 !important",
      },
      '& th':{
        fontWeight: '650'
      },
      '& th.MuiTableCell-root .MuiInputBase-input':{
        padding: "3px 0 7px 0 !important"
      },
      '& .TableFilterCell-cell:first-of-type':{
        paddingLeft: '1rem !important'
      },
    },
  });

const DateFilterCellBase = ({ filter, onFilter, classes }) => {
  return (
    <TableCell
      sx={{
      "& label": {
        marginTop: '-1rem'
      }, 
      "& label:has(+ .Mui-focused)":{
        marginTop: "-0.2rem"
      }
    }}    
    >
      <DatePicker
        label={translate("app.generic.filter")}
        value={filter ? filter.value : null}
        onChange={(date, value) =>
          onFilter(date ? { value: date.format("DD.MM.YYYY") } : null)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: "DD.MM.YYYY",
            }}
          />
        )}
        // KeyboardButtonProps={{
        //   "aria-label": "change date",
        // }}
      />
    </TableCell>
  );
};

const DateTypeProvider = (props) => {
  return <DataTypeProvider formatterComponent={renderDate} {...props} />;
};

const renderDate = (date) => {
  return moment(date.value).format("DD.MM.YYYY");
};

const FilterCell = (props) => {
  const { column } = props;
  if (column.name === "eParlamentSync.sittingDate2") return <DateFilterCellBase {...props} />;

  return <TableFilterRow.Cell {...props} />;
};

const getCellValue = (row, columnName) => {
  let renderedValue = _.get(row, columnName);
  if(columnName === "status") {
    if(renderedValue === invitationStatusEnum[0].value) {
      return (row.status = invitationStatusEnum[0].label, renderedValue = invitationStatusEnum[0].label)
    } else {
      return (row.status = invitationStatusEnum[1].label, renderedValue = invitationStatusEnum[1].label)
    }
  }

  return renderedValue;
};

const getRowId = (row) => row.id;
const CustomHeaderCell = (props) => {
  const { column } = props;
  const classes = useStyles();

  return (
    <TableHeaderRow.Cell
      className={classes.header}
      {...props}
      key={column.name}
      getMessage={() => column.title}
    />
  );
};

const TableRow = ({ row, ...restProps }) => {
  return <Table.Row key={row.id} {...restProps} />;
};

const DataTable = (props) => {
  const classes = useStyles();
  // const [selectedParlamentPokani, setSelectedParlamentPokani] = useState();
  const { dataTable, fromRoute } = props

  const columnsAnnouncements = [
    {
      name:  "eParlamentSync.sittingDescTypeTitle",
      title: translate("app.eParlament.table.sittingDescTypeShort"),
      cellProps: (value) => sittingDescTypeEnum[value].label
    },
    {
      name: "rabotnoTelo.name",
      title: translate("app.eParlament.table.committeeTitleShort")
    },
    {
      name: "eParlamentSync.sittingNumber",
      title: translate("app.eParlament.table.sittingNumberShort")
    },
    {
      name:"eParlamentSync.sittingContinuationNum",
      title: translate("app.eParlament.table.sittingContinuationNumShort")
    },
    {
      name:  "eParlamentSync.sittingDate2",
      title: translate("app.eParlament.table.sittingDateShort")
    },
    {
      name:  "eParlamentSync.sittingLocation",
      title: translate("app.eParlament.table.sittingLocationShort"),
    },
    {
      name: "eParlamentSync.statusRgo",
      title: translate("app.eParlament.table.sittingStatusShort"),
    },
  ]

  const columnsInivitations = [...columnsAnnouncements, {
    name: "status",
    title: translate("app.eParlament.table.invitationStatusShort"),
  }]
  
  const [columns, setColumns] = useState(fromRoute === "invitations" ? columnsInivitations : columnsAnnouncements);
  const [rows, setRows] = useState(dataTable);
  const [sorting, getSorting] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 50]);
  const [dateColumns, setDateColumns] = useState(["earlamentSync.sittingDate2"]);

  const [defaultWidthsAnnouncements, setDefaultWidthsAnnouncement] = useState([
    {columnName: "eParlamentSync.sittingDescTypeTitle", width: "10%"},
    // {columnName: "rabotnoTelo.name", width: props.isAdmin ? "26%" : "35%"},
    {columnName: "rabotnoTelo.name", width: "26%"},
    {columnName: "eParlamentSync.sittingNumber", width: "8%"},
    {columnName: "eParlamentSync.sittingContinuationNum", width: "8%"},
    {columnName: "eParlamentSync.sittingDate2", width: "13%"},
    {columnName: "eParlamentSync.sittingLocation", width: "15%"},
    {columnName: "eParlamentSync.statusRgo", width: "10%"},
  ]);
  const [defaultWidthsInvitations, setDefaultWidthsInvitations] = useState([
    {columnName: "eParlamentSync.sittingDescTypeTitle", width: "10%"},
    // {columnName: "rabotnoTelo.name", width: props.isAdmin ? "21%" : "30%"},
    {columnName: "rabotnoTelo.name", width: "21%"},
    {columnName: "eParlamentSync.sittingNumber", width: "8%"},
    {columnName: "eParlamentSync.sittingContinuationNum", width: "9%"},
    {columnName: "eParlamentSync.sittingDate2", width: "15%"},
    {columnName: "eParlamentSync.sittingLocation", width: "10%"},
    {columnName: "eParlamentSync.statusRgo", width: "10%"},
    {columnName: "status", width: "7%"}
  ]);

  const [defaultHiddenColumnNames] = useState([]);

  const actionsColumnFill = (props) => {
    const actions = [];
    fromRoute === "invitations" && props.isAdmin && actions.push({
      name: "Print",
      icon: <PrintIcon fontSize="inherit" />,
      tooltip: translate("app.announcements.print"),
      action: (row) => {
        if(props.onClickPrint)props.onClickPrint(row);
      },
    });
    (props.isAdmin || (props.isKorisnik && fromRoute === "invitations")) && actions.push({
      name: "Group",
      icon: <Group fontSize="inherit" />,
      tooltip: fromRoute === "announcements" ? translate("app.generic.notification") : translate("app.generic.invitation"),
      action: (row) => {
        if (props.onClickGroup) props.onClickGroup(row)
      },
    })
    return actions;
  };

  useEffect(() => {
    setRows(dataTable)
  }, [fromRoute, dataTable]);

  return (
    <>
      {rows && <Paper sx={classes.tableStyles}>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
          getCellValue={getCellValue}
        >
          <FilteringState />
          <SortingState sorting={sorting} onSortingChange={getSorting} />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
          <IntegratedFiltering />
          <IntegratedSorting />
          <IntegratedPaging />
          <DateTypeProvider for={dateColumns} />
          <Table
            rowComponent={TableRow}
            messages={{ noData: translate("app.generic.noData") }}
          />
          <TableColumnResizing
            columnWidths={fromRoute === "invitations" ? defaultWidthsInvitations : defaultWidthsAnnouncements}
            onColumnWidthsChange={fromRoute === "invitations" ? setDefaultWidthsInvitations : setDefaultWidthsAnnouncement}
            resizingMode={"nextColumn"}
          />
          <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
          />
          <TableHeaderRow
            showSortingControls
            cellComponent={CustomHeaderCell}
          />
          <TableFilterRow
            cellComponent={FilterCell}
            messages={{
              filterPlaceholder: translate("app.generic.filter"),
            }}
          />
          <Toolbar />
          <Template name="toolbarContent">
            <TemplatePlaceholder />
            <ExportMenu>
              {(handleClose) => (
                <ExportItems
                  defaultEncryption={props.encryption}
                  onSelect={(format, password, encryption) => {
                    exportService(
                      format,
                      rows,
                      columns,
                      true,
                      { exportUrl: props.exportUrl, password, encryption },
                      props.exportFileName
                    );
                    handleClose();
                  }}
                />
              )}
            </ExportMenu>
          </Template>
          <ColumnChooser
            messages={{
              showColumnChooser: translate("app.generic.showColumnChooser"),
            }}
          />
          {(props.isAdmin || (props.isKorisnik && fromRoute === "invitations")) && <ActionsColumn
            actions={actionsColumnFill(props)}
            width="10%"
            align="right"
          />}
          <PagingPanel
            pageSizes={pageSizes}
            messages={{
              rowsPerPage: translate("app.generic.table.rowsPerPage"),
              info: translate("app.generic.table.info"),
            }}
          />
            {props.openPrintDialog && <PrintDialog />}
        </Grid>
      </Paper>
    }
    </>
  );
};

DataTable.propTypes = {
  onClickGroup: PropTypes.func.isRequired,
  onClickPrint: PropTypes.func.isRequired,
};

export default DataTable;
