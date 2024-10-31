import React, { useState, useEffect } from "react";
import {
  Edit,
  AddBox,
  Stop,
  PlayArrow,
} from "@mui/icons-material";
import { IconButton, TableCell, Select, Fab, Tooltip, TextField} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { withStyles } from "@mui/styles";
import {
  Template,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import AlertDialog from "../../../../../util/alert/AlertDialog";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableEditRow,
  TableEditColumn,
  TableFilterRow,
  TableColumnVisibility,
  TableColumnResizing,
  Toolbar,
  ColumnChooser,
} from "@devexpress/dx-react-grid-material-ui";
import {
  FilteringState,
  EditingState,
  SortingState,
  PagingState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSorting,
  DataTypeProvider,
} from "@devexpress/dx-react-grid";
import _ from "lodash";
import { translate } from "../../../../../util/lang/translate-wrapper";
import { makeStyles } from "@mui/styles";
import { useTheme} from "@mui/material";
import moment from "moment";
import ActionsColumn from "../../plugins/actionsColumn";
import ExportMenu from "asseco-commons/dist/utils/datatable/exporter/ExportMenu";
import ExportItems from "asseco-commons/dist/utils/datatable/exporter/ExportItems";
import exportService from "asseco-commons/dist/utils/datatable/exporter/exportService";
import {statusOptions}  from "../../../../../util/enum/statusEnum";
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FlagIcon from '@mui/icons-material/Flag';

const DateTypeProvider = (props) => {
  return <DataTypeProvider formatterComponent={renderDate} {...props} />;
};
function renderDate(dateString) {
  var newDateString = moment(dateString.value, "YYYY-MM-DD").format(
    "DD.MM.YYYY"
  );
  return dateString.value ? <div>{newDateString}</div> : null;
}

const DateFilterCellBase = ({ filter, onFilter, classes }) => {
  return (
    <TableCell>
      <DatePicker
        label={translate("app.generic.filter")}
        value={filter ? filter.value : null}
        onChange={(date, value) =>
            onFilter(date ?  {value: date.format("DD.MM.YYYY")} : null)
        }
        renderInput={(params) => 
          <TextField  
            {...params} 
            inputProps={
              { 
                ...params.inputProps, 
                placeholder: "DD.MM.YYYY" 
              }
            }
          />
        }
      />
    </TableCell>
  );
};

const ActiveFilterCellBase = ({ filter, onFilter, theme }) => (
  <TableCell className={theme.cell}>
    <Select
      id="activeFilter"
      value={filter ? filter.value : ""}
      placeholder="Filter..."
      displayEmpty
      onChange={(e) =>
        onFilter(e.target.value ? { value: e.target.value } : null)
      }
    ></Select>
  </TableCell>
);

const ActiveFilterCell = withStyles(
  {},
  { name: "ActiveFilterCell" }
)(ActiveFilterCellBase);

const DateFilterCell = withStyles(
  {},
  { name: "DateFilterCell" }
)(DateFilterCellBase);

const FilterCell = (props) => {
  const { column } = props;
  if (column.name === "user.active") {
    return <ActiveFilterCell {...props} />;
  }
  if (column.name === "dateTo" || column.name === "dateFrom") {
    return <DateFilterCell {...props} />;
  }
  return <TableFilterRow.Cell {...props} />;
};

const getCellValue = (row, columnName) => {
  let renderedValue = _.get(row, columnName);
  if (columnName === "status" && renderedValue === 1)
    return statusOptions[1].label;
  if (columnName === "status" && renderedValue === 0)
    return statusOptions[0].label;

  return renderedValue;
};
const useStyles = makeStyles (() => ({
  header: {
    fontWeight: "bold",
  },
}));
const styles = {
  deactivated: {
    backgroundColor: "#ff6666",
  },
  selected: {
    backgroundColor: "lightblue",
  },
};
const getRowId = (row) => row.user.userId;
const CustomHeaderCell = (props) => {
  const { column } = props;
  const theme = useTheme();
const classes = useStyles();
  //if (column.name === "bukva")
  return (
    <TableHeaderRow.Cell
      className={classes.header}
      {...props}
      key={column.name}
      // getMessage={(string) => string = column.title}
    />
  );
  //return <TableHeaderRow.Cell {...props} key={column.name} getMessage={() => column.title} />
};
const actionsColumnFill = (props) => {
  const actions = [];
  
  actions.push({
    name: "ADD",
    icon: <AddBox fontSize="inherit" />,
    tooltip: translate("app.generic.add"),
    action: (row) => props.onAdd(),
  });
  actions.push({
    name: "EDIT",
    icon: <Edit fontSize="inherit" />,
    tooltip: translate("app.generic.edit"),
    action: (row) => props.onEdit(row),
  });
  
  actions.push({
    name: "ACTIVATE",
    icon: <PlayArrow fontSize="inherit" />,
    tooltip: translate("app.generic.activate"),
    action: (row) => props.onActivate(row),
  });
  
  actions.push({
    name: "DEACTIVATE",
    icon: <Stop fontSize="inherit" />,
    tooltip: translate("app.generic.deactivate"),
    action: (row) => props.onDeactivate(row),
  });

  return actions;
};

const WorkingPositionsTable = (props) => {
  const [columns] = useState([
    {
      name:"flagActions",
      title:" "
    },
    {
      name: "company",
      title: translate(`app.dosie.workingPositions.company`),
    },
    {
      name: "workingPositionType.name",
      title: translate(`app.dosie.workingPositions.name`),
    },
    {
      name: "workingPositionType.nameMk",
      title: translate(`app.dosie.workingPositions.nameMk`),
    },
    {
      name: "dateFrom",
      title: translate(`app.dosie.workingPositions.datumOd`),
    },
    {
      name: "dateTo",
      title: translate(`app.dosie.workingPositions.datumDo`),
    },
    {
      name: "status",
      title: translate("app.dosie.workingPositions.status"),
    },
  ]);
  const [rows, setRows] = useState(props.data);
  const [sorting, getSorting] = useState([]);
  const [editingRowIds, getEditingRowIds] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([10, 50, 100]);

  const [isFlagged, setIsFlagged] = useState(false);
  const [openFlagDialog, setOpenFlagDialog] = useState(false);

  const [defaultWidths, setDefaultWidths] = useState([
    { columnName: "company", width: "auto" },
    { columnName: "workingPositionType.name", width: "auto" },
    { columnName: "workingPositionType.nameMk", width: "auto" },
    { columnName: "dateFrom", width: "auto" },
    { columnName: "dateTo", width: "auto" },
    { columnName: "status", width: "auto" },
    { columnName: "flagActions", width: "50px" },
  ]);
  const [dateColumns, setDateColumns] = useState(["dateTo", "dateFrom"]);
  const [defaultHiddenColumnNames] = useState([]);
  useEffect(() => {
    setRows(props.data);
  }, [props.data]);

  const handleFlagClick = (row) => {
    row.flag === 1 ? row.flag = 0 : row.flag = 1
    props.onFlag(row)
  };

  const CellComponent = ({ column, row, ...restProps }) => {
    if( column.name === "flagActions")  {
      if( row.flag === 1) {
        return (
            <Table.Cell 
            style={{paddingLeft:"15px", paddingRight: 0, margin: 0}}
            {...restProps} >
              <Tooltip title={translate("app.dosie.workingPositions.priority")}>
                <IconButton
                    onClick={() => {setOpenFlagDialog(row); setIsFlagged(true)}}
                    size="small" 
                    color="primary">
                  <FlagIcon style={{fontSize:"20px"}} />
                </IconButton>
              </Tooltip>
            </Table.Cell>
        );
      }
      else {
        return (
            <Table.Cell
              style={{paddingLeft:"15px", paddingRight: 0, margin: 0}}
              {...restProps} 
              >
                <Tooltip title={translate("app.dosie.workingPositions.priority")}>
                  <IconButton
                      onClick={() => {setOpenFlagDialog(row); setIsFlagged(false)}}
                      size="small" >
                    <FlagOutlinedIcon style={{fontSize:"20px"}} />
                  </IconButton>
                </Tooltip>
            </Table.Cell>
        );
      }
    }
    return <Table.Cell {...restProps} />;
  };

  const TableRow = ({ row, ...restProps }) => {
    if (row.status === 0)
      return (
        <Table.Row
          {...restProps}
          // eslint-disable-next-line no-alert
          style={{
            ...styles.deactivated,
          }}
        />
      );
    return <Table.Row {...restProps} />;
  };
  return (
    <form autoComplete="off">
      <div id={"UsersTable"}>
        <Grid
          rows={rows}
          columns={columns}
          // getRowId={getRowId}
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
          <Table rowComponent={TableRow} cellComponent={CellComponent}  />
          <TableColumnResizing
            columnWidths={defaultWidths}
            onColumnWidthsChange={setDefaultWidths}
            resizingMode={"nextColumn"}
          />
          <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
          />
          <TableHeaderRow
            showSortingControls
            cellComponent={CustomHeaderCell}
          />

          <TableFilterRow cellComponent={FilterCell} />
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
              showColumnChooser: translate("app.generic.showColumnChooser")
            }}
          />
          <ActionsColumn
            actions={actionsColumnFill(props)}
            width={150}
            align={"right"}
          />
          <PagingPanel 
              pageSizes={pageSizes}
              messages={{
                  rowsPerPage: translate("app.generic.table.rowsPerPage"),
                  info: translate("app.generic.table.info")
              }}
          />
        </Grid>
      </div>
      {openFlagDialog && (
        <AlertDialog
          id={"flagAlertDialog"}
          open={openFlagDialog}
          item={openFlagDialog}
          onClose={() => setOpenFlagDialog(false)}
          onCloseYes={() => setOpenFlagDialog(false)}
          onFunction={(item) => handleFlagClick(item)}
          text={translate(`app.dosie.workingPositions.${isFlagged ? 'nonPrioritetWorkingPosition' : 'prioritetWorkingPosition'}`)}
        />
      )}
    </form>
  );
};

export default WorkingPositionsTable;
