import React, { useState, useEffect } from "react";
import {
  Edit,
  AddBox,
} from "@mui/icons-material";
import { TableCell, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { withStyles } from "@mui/styles";
import {
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
import moment from "moment";
import ActionsColumn from "../plugins/actionsColumn";
import ExportMenu from "asseco-commons/dist/utils/datatable/exporter/ExportMenu";
import ExportItems from "asseco-commons/dist/utils/datatable/exporter/ExportItems";
import exportService from "asseco-commons/dist/utils/datatable/exporter/exportService";
import DeleteIcon from '@mui/icons-material/Delete';

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
  if (renderedValue === true) return "✔";
  if (renderedValue === false) return "✖";

  return renderedValue;
};

const useStyles = makeStyles (() => ({
  header: {
    fontWeight: "bold",
  },
}));

const CustomHeaderCell = (props) => {
  const { column } = props;
  const theme = useTheme();
const classes = useStyles();
  return (
    <TableHeaderRow.Cell
      className={classes.header}
      {...props}
      key={column.name}
    />
  );
};



const EducationTable = (props) => {

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
      name: "DELETE",
      icon: <DeleteIcon fontSize="inherit" />,
      tooltip: translate("app.generic.delete"),
      action: (row) => props.onDelete(row)
    });
  
    return actions;
  };

  const [columns] = useState([
    {
      name: "facultyModel.faculty",
      title: translate(`app.dosie.other.educationForm.faculty`),
    },
    {
      name: "universityModel.university",
      title: translate(`app.dosie.other.educationForm.university`),
    },
    {
      name: "degreeEducation.degree",
      title: translate(`app.dosie.other.educationForm.degree`),
    },
    {
      name: "titleEducation",
      title: translate(`app.dosie.other.educationForm.titleEducation`),
    },
    {
      name: "dateStart",
      title: translate(`app.dosie.other.educationForm.dateStart`),
    },
    {
      name: "dateEnd",
      title: translate(`app.dosie.other.educationForm.dateEnd`),
    },
  ]);
  const [rows, setRows] = useState(props.data);
  const [sorting, getSorting] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([10, 50, 100]);

  const [defaultWidths, setDefaultWidths] = useState([
    { columnName: "facultyModel.faculty", width: "auto" },
    { columnName: "universityModel.university", width: "auto" },
    { columnName: "degreeEducation.degree", width: "auto" },
    { columnName: "titleEducation", width: "auto" },
    { columnName: "dateStart", width: "auto" },
    { columnName: "dateEnd", width: "auto" }
  ]);
  const [dateColumns] = useState(["dateEnd", "dateStart"]);
  const [defaultHiddenColumnNames] = useState([]);
  useEffect(() => {
    setRows(props.data);
  }, [props.data]);

  const TableRow = ({ row, ...restProps }) => {
    if (row.status === 0)
      return (
        <Table.Row
          {...restProps}
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

export default EducationTable;
