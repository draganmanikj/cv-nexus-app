import React, { useState, useEffect } from "react";
import {
  Check,
} from "@mui/icons-material";
import {  TableCell, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { withStyles } from "@mui/styles";
import {
  Getter,
  Template,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
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
import { translate } from "../../../util/lang/translate-wrapper";
import { makeStyles } from "@mui/styles";
import { useTheme} from "@mui/material";
// import { renderDateCustomCell } from "../../../util/helper/generalHelpers";
import moment from "moment";
import ActionsColumn from "./plugins/actionsColumn";
import ExportMenu from "asseco-commons/dist/utils/datatable/exporter/ExportMenu";
import ExportItems from "asseco-commons/dist/utils/datatable/exporter/ExportItems";
import exportService from "asseco-commons/dist/utils/datatable/exporter/exportService";

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
  if (column.name === "dateCreated" || column.name === "dateModified") {
    return <DateFilterCell {...props} />;
  }
  return <TableFilterRow.Cell {...props} />;
};

const getCellValue = (row, columnName) => {
  let renderedValue = _.get(row, columnName);
  if (renderedValue === true) return "✔";
  if (renderedValue === false) return "✖";
  return renderedValue;
};
const useStyles = makeStyles (() => ({
  header: {
    fontWeight: "bold",
  },
}));
const styles = {
  deactivated: {
    backgroundColor: "#ef5350",
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
      getMessage={() => column.title}
    />
  );
  //return <TableHeaderRow.Cell {...props} key={column.name} getMessage={() => column.title} />
};
const actionsColumnFill = (props) => {
  const actions = [];
  actions.push({
    name: "SELECT",
    icon: <Check fontSize="inherit" />,
    tooltip: translate("app.generic.select"),
    action: (row) => props.onSelect(row),
  });

  return actions;
};

const UsersTable = (props) => {
  const [columns] = useState([
    {
      name: "position_no",
      title: translate("app.dosie.positionBroj"),
    },
    {
      name: "user.name",
      title: translate("app.dosie.username"),
    },
    {
      name: "user.firstName",
      title: translate("app.dosie.firstName"),
    },
    {
      name: "user.lastName",
      title: translate("app.dosie.lastName"),
    },
    {
      name: "user.email",
      title: translate("app.dosie.email"),
    },
    // {
    //   name: "workingPosition",
    //   title: translate("app.dosie.workingPosition"),
    // },
    {
      name: "applicationRole.name",
      title: translate("app.dosie.sektor"),
    },
    {
      name: "applicationRole.application.name",
      title: translate("app.dosie.company"),
    },
  ]);
  const [rows, setRows] = useState(props.data);
  const [sorting, getSorting] = useState([]);
  const [editingRowIds, getEditingRowIds] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([10, 50, 100]);

  const [defaultWidths, setDefaultWidths] = useState([
    { columnName: "position_no", width: "auto" },
    { columnName: "user.name", width: "auto" },
    { columnName: "user.firstName", width: "auto" },
    { columnName: "user.lastName", width: "auto" },
    { columnName: "user.email", width: "auto" },
    // { columnName: "workingPosition", width: "auto" },
    { columnName: "applicationRole.name", width: "10%" },
    { columnName: "applicationRole.application.name", width: "auto" },
    // { columnName: "dateModified", width: "auto" },
  ]);
  const [dateColumns, setDateColumns] = useState([
    "dateCreated",
    "dateModified",
  ]);
  const [defaultHiddenColumnNames] = useState([]);
  useEffect(() => {
    setRows(props.data);
  }, [props.data]);

  const TableRow = ({ row, ...restProps }) => {
    if (props.selectedUser && props.selectedUser.id === row.id)
      return (
        <Table.Row
          {...restProps}
          // eslint-disable-next-line no-alert
          style={{
            ...styles.selected,
          }}
        />
      );
    return <Table.Row {...restProps} />;
  };
  
  return (
    <form autocomplete="off">
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
          <Table rowComponent={TableRow} />
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
    </form>
  );
};

export default UsersTable;
