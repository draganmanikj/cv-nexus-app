import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { TableCell, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { withStyles } from "@mui/styles";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableColumnResizing,
  TableColumnVisibility,
  Toolbar,
  ColumnChooser,
} from "@devexpress/dx-react-grid-material-ui";
import {
  PagingState,
  IntegratedPaging,
  FilteringState,
  SortingState,
  IntegratedFiltering,
  DataTypeProvider,
  IntegratedSorting,
} from "@devexpress/dx-react-grid";
import {
  Edit,
  Save,
  Details,
  AddBox,
  Delete,
  Stop,
  PlayArrow,
  People,
} from "@mui/icons-material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ActionsColumn from "./plugins/actionsColumn";
import { makeStyles } from "@mui/styles";
import { useTheme} from "@mui/material";
import { translate } from "../../util/lang/translate-wrapper";
import moment from "moment";
import { Template, TemplatePlaceholder } from "@devexpress/dx-react-core";
import ExportMenu from "asseco-commons/dist/utils/datatable/exporter/ExportMenu";
import ExportItems from "asseco-commons/dist/utils/datatable/exporter/ExportItems";
import exportService from "asseco-commons/dist/utils/datatable/exporter/exportService";
import { renderDateCustomCell } from "../../util/helper/generalHelpers";

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

const actionsColumnFill = (props) => {
  const actions = [];
  actions.push({
    name: "ADD",
    icon: <AddBox fontSize="inherit" />,
    tooltip: translate("app.generic.add"),
    action: () => props.onAdd(),
  });
  actions.push({
    name: "EDIT",
    icon: <Edit fontSize="inherit" />,
    tooltip: translate("app.generic.edit"),
    action: (row) => props.onEdit(row),
  });
  actions.push({
    name: "EDIT",
    icon: <DeleteForeverIcon fontSize="inherit" />,
    tooltip: translate("app.generic.delete"),
    action: (row) => props.onDelete(row),
});
  // actions.push({
  //     name: "USERS",
  //     icon: <People fontSize="inherit" />,
  //     tooltip: translate("app.generic.users"),
  //     action: (row) => props.onDetails(row),
  // });
  actions.push({
    name: "DEACTIVATE",
    icon: <Stop fontSize="inherit" />,
    tooltip: translate("app.generic.deactivate"),
    action: (row) => props.onDeactivate(row),
  });
  actions.push({
    name: "ACTIVATE",
    icon: <PlayArrow fontSize="inherit" />,
    tooltip: translate("app.generic.activate"),
    action: (row) => props.onActivate(row),
  });
  return actions;
};

const TableRow = ({ row, ...restProps }) => {
  if (!row.status)
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

const getCellValue = (row, columnName) => {
  let renderedValue = row[columnName];
  if (renderedValue === true) return "✔";
  return renderedValue;
};

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

// const EditCell = (props) => {
//   const { column } = props;
//   if (column.name === "activeFromDate" || column.name === "activeToDate") {
//     return <DateEditCellBase {...props} />;
//   }
//   return <TableEditRow.Cell {...props} />;
// };

const DocumentTypesTable = (props) => {
  const [columns] = useState([
    { name: "docType", title: translate("app.documentTypes.table.name") },

    { name: "createdBy", title: translate("app.groups.table.createdBy") },
    {
      name: "dateCreated",
      title: translate("app.groups.table.dateCreated"),
      customCell: (value) => {
        return renderDateCustomCell(value);
      },
    },
    { name: "modifiedBy", title: translate("app.groups.table.modifiedBy") },
    {
      name: "dateModified",
      title: translate("app.groups.table.dateModified"),
      customCell: (value) => {
        return renderDateCustomCell(value);
      },
    },
  ]);
  const [rows, setRows] = useState([]);
  const [pageSizes] = useState([10, 50, 100]);
  const [dateColumns, setDateColumns] = useState([
    "dateCreated",
    "dateModified",
  ]);
  const [defaultWidths, setDefaultWidths] = useState([
    { columnName: "docType", width: "auto" },
    { columnName: "createdBy", width: "auto" },
    { columnName: "modifiedBy", width: "auto" },
    { columnName: "dateCreated", width: "auto" },
    { columnName: "dateModified", width: "auto" },
  ]);
  const [defaultHiddenColumnNames] = useState(["modifiedBy","dateModified"]);
  const [sorting, getSorting] = useState([]);
  const [tableColumnExtensions] = useState([
    { columnName: "docType", wordWrapEnabled: true },
    { columnName: "createdBy", wordWrapEnabled: true },
    { columnName: "modifiedBy", wordWrapEnabled: true },
    { columnName: "dateCreated", wordWrapEnabled: true },
    { columnName: "dateModified", wordWrapEnabled: true },
  ]);
  useEffect(() => {
    setRows(props.data);
  }, [props.data]);

  return (
    <Paper>
      <form autocomplete="off">
        <div id={"groupsTable"}>
          <Grid rows={rows} columns={columns} getCellValue={getCellValue} a>
            <FilteringState
              columnExtensions={[{ columnName: "id", filteringEnabled: false }]}
            />
            <SortingState sorting={sorting} onSortingChange={getSorting} />
            <PagingState defaultCurrentPage={0} defaultPageSize={10} />
            <IntegratedFiltering />
            <IntegratedSorting />
            <IntegratedPaging />

            <DateTypeProvider for={dateColumns} />
            <Table
              rowComponent={TableRow}
              columnExtensions={tableColumnExtensions}
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
            <ColumnChooser />
            <ActionsColumn
              actions={actionsColumnFill(props)}
              width={150}
              align={"right"}
            />
            <PagingPanel pageSizes={pageSizes} />
          </Grid>
        </div>
      </form>
    </Paper>
  );
};

export default DocumentTypesTable;
