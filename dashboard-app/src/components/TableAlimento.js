import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import { useCubeQuery } from "@cubejs-client/react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination, Typography
} from "@material-ui/core";import StatusBullet from "./StatusBullet";
import palette from "../theme/palette";const useStyles = makeStyles(theme => ({
  root: {
    padding: 0
  },
  content: {
    padding: 0
  },
  head: {
    backgroundColor: palette.background.gray
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: "flex",
    alignItems: "baseline"
  },
  status: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: "flex-end"
  },
}));const statusColors = {
  completed: "success",
  processing: "info",
  shipped: "danger"
};const TableComponent = props => {const { className, query, cubejsApi, ...rest } = props;const classes = useStyles();const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);const tableHeaders = [
    {
      text: "Alimento id",
      value: "Alimento.id"
    },
    {
      text: "Marca",
      value: "Alimento.marca"
    },
    {
      text: "Presentacion",
      value: "Alimento.presentacion"
    },
    {
      text: "Consumo Diario",
      value: "Alimento.consumo_diario"
    },
    {
      text: "Id Mascota Asociada",
      value: "Alimento.id_mascota"
    },
      {
      text: "Acciones"
    }

  ];
  const { resultSet, error, isLoading } = useCubeQuery(query, { cubejsApi });
  if (isLoading) {
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress color="secondary" /></div>;
  }
  if (error) {
    return <pre>{error.toString()}</pre>;
  }
  if (resultSet) {
    let alimento = resultSet.tablePivot();const handlePageChange = (event, page) => {
      setPage(page);
    };
    const handleRowsPerPageChange = event => {
      setRowsPerPage(event.target.value);
    };return (
      <Card
        {...rest}
        padding={"0"}
        className={clsx(classes.root, className)}
      >
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead className={classes.head}>
                  <TableRow>
                    {tableHeaders.map((item) => (
                      <TableCell key={item.value + Math.random()} 
                 className={classes.hoverable}           
                      >
                        <span>{item.text}</span>
              
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {alimento.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(obj => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={obj["Alimento.id"]}
                    >
                      <TableCell>
                        {obj["Alimento.id"]}
                      </TableCell>
                      <TableCell>
                        {obj["Alimento.marca"]}
                      </TableCell>
                      <TableCell>
                        {obj["Alimento.presentacion"]}
                      </TableCell>
                      <TableCell>
                        {obj["Alimento.consumo_diario"]}
                      </TableCell>
                      <TableCell>
                        {obj["Alimento.id_mascota"]}
                      </TableCell>
                      <TableCell>
                       <IconButton  aria-label="delete">
                        <EditIcon />
                      </IconButton>
                       <IconButton color="secondary" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={alimento.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
          />
        </CardActions>
      </Card>
    );
  } else {
    return null
  }
};TableComponent.propTypes = {
  className: PropTypes.string,
  query: PropTypes.object.isRequired
};export default TableComponent;