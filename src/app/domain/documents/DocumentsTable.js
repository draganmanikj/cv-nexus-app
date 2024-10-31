import React, { useState, useEffect } from "react";
import {
  Edit,
  AddBox,
  Stop,
  Delete,
  Save,
  Cancel,
  PlayArrow,
} from "@mui/icons-material";
import { IconButton, TableCell, Select, MenuItem, TextField } from "@mui/material";
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
import { translate } from "../../util/lang/translate-wrapper";
import { makeStyles } from "@mui/styles";
import { useTheme} from "@mui/material";
import { renderDateCustomCell } from "../../util/helper/generalHelpers";
import moment from "moment";
import ActionsColumn from "../../domain/groups/plugins/actionsColumn";
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
    backgroundColor: "red",
  },
};
const getRowId = (row) => row.user.userId;
// const CustomHeaderCell = (props) => {
//   const { column } = props;
//   const theme = useTheme();
const classes = useStyles();
//   //if (column.name === "bukva")
//   return (
//     <TableHeaderRow.Cell
//       className={classes.header}
//       {...props}
//       key={column.name}
//       getMessage={() => column.title}
//     />
//   );
//return <TableHeaderRow.Cell {...props} key={column.name} getMessage={() => column.title} />
// };
// const actionsColumnFill = (props) => {
//   const actions = [];
//   actions.push({
//     name: "ADD",
//     icon: <AddBox fontSize="inherit" />,
//     tooltip: translate("app.generic.add"),
//     action: () => props.onAdd(),
//   });
//   actions.push({
//     name: "EDIT",
//     icon: <Edit fontSize="inherit" />,
//     tooltip: translate("app.generic.edit"),
//     action: (row) => props.onEdit(row),
//   });

//   actions.push({
//     name: "DEACTIVATE",
//     icon: <Stop fontSize="inherit" />,
//     tooltip: translate("app.generic.deactivate"),
//     action: (row) => props.onDeactivate(row),
//   });
//   actions.push({
//     name: "ACTIVATE",
//     icon: <PlayArrow fontSize="inherit" />,
//     tooltip: translate("app.generic.activate"),
//     action: (row) => props.onActivate(row),
//   });

//   return actions;
// };
const TableRow = ({ row, ...restProps }) => {
  if (!row.active)
    return (
      <Table.Row
        {...restProps}
      />
    );
  return <Table.Row {...restProps} />;
};

// const CellComponent = ({ column, ...restProps }) => {
//   if (
//     (column.name === "applicationRole.name" &&
//       restProps.row.applicationRole &&
//       !restProps.row.applicationRole.active) ||
//     (column.name === "userGroup.name" &&
//       restProps.row.userGroup &&
//       !restProps.row.userGroup.active)
//   )
//     return (
//       <Table.Cell
//         {...restProps}
//         // eslint-disable-next-line no-alert
//         style={{
//           ...styles.deactivated,
//         }}
//       />
//     );
//   return <Table.Cell {...restProps} />;
// };
const DocumentsTable = (props) => {
  const [columns] = useState([
    {
      name: "documentUrl",
      title: translate("app.applications.form.labels.name"),
    },
    {
      name: "description",
      title: translate("app.applications.form.labels.description"),
    },
    {
      name: "status",
      title: translate("app.applications.form.labels.applicationName"),
    },
    {
      name: "version",
      title: translate("app.applications.form.labels.applicationName"),
    },

    {
      name: "createdBy",
      title: translate(`app.applications.table.createdBy`),
    },
    {
      name: "dateCreated",
      title: translate(`app.applications.table.dateCreated`),
      customCell: (value) => {
        return renderDateCustomCell(value);
      },
    },
    {
      name: "modifiedBy",
      title: translate(`app.applications.table.modifiedBy`),
    },
    {
      name: "dateModified",
      title: translate(`app.applications.table.dateModified`),
      customCell: (value) => {
        return renderDateCustomCell(value);
      },
    },
  ]);
  const [rows, setRows] = useState(props.document);
  const [sorting, getSorting] = useState([]);
  const [editingRowIds, getEditingRowIds] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([10, 50, 100]);
  const [editingStateColumnExtensions] = useState([
    { columnName: "applicationRole.name", editingEnabled: false },
    //  { columnName: "user.active", editingEnabled: false },
  ]);
  const [defaultWidths, setDefaultWidths] = useState([
    { columnName: "documentUrl", width: "auto" },
    { columnName: "description", width: "auto" },
    { columnName: "status", width: "auto" },
    { columnName: "version", width: "auto" },
    { columnName: "createdBy", width: "auto" },
    { columnName: "modifiedBy", width: "auto" },
    { columnName: "dateCreated", width: "auto" },
    { columnName: "dateModified", width: "auto" },
  ]);
  const [dateColumns, setDateColumns] = useState([
    "dateCreated",
    "dateModified",
  ]);
  const [tableColumnExtensions] = useState([
    { columnName: "applicationRole.name", wordWrapEnabled: true },
    { columnName: "documentUrl", wordWrapEnabled: true },
    { columnName: "description", wordWrapEnabled: true },
    { columnName: "status", wordWrapEnabled: true },
    { columnName: "version", wordWrapEnabled:true },
    { columnName: "createdBy", wordWrapEnabled: true },
    { columnName: "modifiedBy", wordWrapEnabled: true },
    { columnName: "dateCreated", wordWrapEnabled: true },
    { columnName: "dateModified", wordWrapEnabled: true },
]);
  const [defaultHiddenColumnNames] = useState(["status","version"]);
  useEffect(() => {
    // setRows(props.document);
  }, [props.document]);

  return (
    <form autocomplete="off">
      <div id={"rolesTable"}>
        <Grid
        rows={rows}
        columns={columns}
        // // getRowId={getRowId}
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
          rowComponent={TableRow} columnExtensions={tableColumnExtensions}
          />
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
            // cellComponent={CustomHeaderCell}
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
          <ColumnChooser />
          {/* <ActionsColumn
            actions={actionsColumnFill(props)}
            width={150}
            align={"right"}
          /> */}
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
      </div>
    </form>
  );
};

export default DocumentsTable;
