import React from "react";
import PropTypes from "prop-types";
import { TABLE_HEADING_TYPE } from "@devexpress/dx-grid-core";
import { Getter, Template, Plugin } from "@devexpress/dx-react-core";
import { Table } from "@devexpress/dx-react-grid-material-ui";
import { Button, IconButton, Tooltip } from "@mui/material";
// import { translate } from "../../util/lang/translate-wrapper";
import withStyles from "@mui/styles/withStyles";

const pluginDependencies = [{ name: "Table" }];

const ACTIONS_COLUMN_TYPE = "actionsColumnType";

function tableColumnsWithActions(tableColumns, width, align) {
  return [
    ...tableColumns,
    {
      key: ACTIONS_COLUMN_TYPE,
      type: ACTIONS_COLUMN_TYPE,
      width: width,
      align: align,
    },
  ];
}

function isHeadingActionsTableCell(tableRow, tableColumn) {
  return (
    tableRow.type === TABLE_HEADING_TYPE &&
    tableColumn.type === ACTIONS_COLUMN_TYPE
  );
}

function isActionsTableCell(tableRow, tableColumn) {
  return (
    tableRow.type !== TABLE_HEADING_TYPE &&
    tableColumn.type === ACTIONS_COLUMN_TYPE
  );
}

class ActionsColumn extends React.PureComponent {
  render() {
    const { actions, width, align } = this.props;
    const tableColumnsComputed = ({ tableColumns }) =>
      tableColumnsWithActions(tableColumns, width, align);

    return (
      <>
        {!actions.length ? (
          <></>
        ) : (
          <Plugin name="ActionsColumn" dependencies={pluginDependencies}>
            <Getter name="tableColumns" computed={tableColumnsComputed} />

            <Template
              name="tableCell"
              predicate={({ tableRow, tableColumn }) =>
                isHeadingActionsTableCell(tableRow, tableColumn)
              }
            >
              {(params) => (
                <Table.Cell
                  {...params}
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    paddingRight: 16,
                  }}
                >
                  {actions[0].name === "ADD" && (
                    <Tooltip placement="top" title={actions[0].tooltip}>
                      <IconButton
                        size="small"
                        onClick={() => actions[0].action()}
                      >
                        {actions[0].icon}
                      </IconButton>
                      {/* <Button
                        variant="contained"
                        key={"add"}
                        color="primary"
                        onClick={() => action.action()}
                      >
                        {action.icon}
                      </Button> */}
                    </Tooltip>
                  )}
                </Table.Cell>
              )}
            </Template>
            <Template
              name="tableCell"
              predicate={({ tableRow, tableColumn }) =>
                isActionsTableCell(tableRow, tableColumn)
              }
            >
              {(params) => (
                <Table.Cell
                  {...params}
                  row={params.tableRow.row}
                  style={{ paddingRight: 16 }}
                >
                  {actions.map((action) => {
                    if (params.tableRow.row) {
                      const id = params.tableRow.row.id;
                      const row = params.tableRow.row;
                      if (
                        row.status &&
                        (action.name === "DEACTIVATE" ||
                          action.name === "EDIT" ||
                          action.name === "USERS" ||
                          action.name === "OPTIONS" ||
                          action.name === "DOSIE")
                      ) {
                        return (
                          <Tooltip placement="top" title={action.tooltip}>
                            <IconButton
                              size="small"
                              key={action.name.toLowerCase() + id}
                              onClick={() => action.action(row)}
                            >
                              {action.icon}
                            </IconButton>
                          </Tooltip>
                        );
                      }
                      if (!row.status && action.name === "ACTIVATE") {
                        return (
                          <Tooltip placement="top" title={action.tooltip}>
                            <IconButton
                              size="small"
                              key={action.name.toLowerCase() + id}
                              onClick={() => action.action(row)}
                            >
                              {action.icon}
                            </IconButton>
                          </Tooltip>
                        );
                      }
                    }
                  })}
                </Table.Cell>
              )}
            </Template>
          </Plugin>
        )}
      </>
    );
  }
}

export default withStyles({})(ActionsColumn);

ActionsColumn.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.PropTypes.shape({
      icon: PropTypes.node,
      action: PropTypes.func.isRequired,
    })
  ).isRequired,
  width: PropTypes.number,
};
ActionsColumn.defaultProps = {
  width: 240,
};
