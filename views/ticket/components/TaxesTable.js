import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pxp from '../../../../Pxp';

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const TaxesTable = ({ tableName = '', columns, data, dataTaxes }) => {
  const [dataRender, setDataRender] = useState(data);
  const [mode, setMode] = useState();
  const [rowNumber, setRowNumber] = useState();
  const [correctValue, setCorrectValue] = useState('');
  const handleChange = (e, valueObject) => {
    setCorrectValue(valueObject);
  };
  const handleEditSave = ({ index, row, action }) => {
    console.log('action', action);
    console.log('index', index);
    setRowNumber(index);
    if (mode === 'edit') {
      setMode('');
    } else {
      setMode('edit');
    }

    if (action === 'Guardar') {
      if(correctValue) {

        console.log(correctValue);
        console.log(row);

        Pxp.apiClient
          .doRequest({
            url: 'boakiu/Taxes/updateTaxes',
            params: {
              taxKey: row.TaxKey,
              taxCode: correctValue.TaxCode,
            },
          })
          .then((resp) => {
            if (resp[0].Result === 1) {
              setMode('');
              setRowNumber(null);
              const findIndex = dataRender.findIndex(
                (dr) => dr.TaxKey === row.TaxKey,
              );
              dataRender[findIndex].correctTax = correctValue.TaxCode;
              setDataRender((prev) => {
                const d = prev;
                d[findIndex].correctTax = correctValue.TaxCode;
                return [...d];
              });
            }
          });

      } else {
        alert('necesitas seleccionar un tax');
      }

    } else {
      const val = row.correctTax | row.taxCode;
      setCorrectValue(val);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography
        component="h3"
        gutterBottom
        variant="overline"
        color="textSecondary"
        align="center"
      >
        {tableName}
      </Typography>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return <TableCell>{column.headerName}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRender.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => {
                console.log('indexindexindex', index);
                return (
                  <TableCell>
                    <Grid container>
                      {column.field !== 'correctTax' && row[column.field]}
                      {column.field === 'correctTax' &&
                        mode !== 'edit' &&
                        rowNumber !== index &&
                      (<span style={{padding: "12px"}}>{row[column.field]}</span>)}

                      {column.field === 'correctTax' && (
                        <>
                          {mode === 'edit' && rowNumber === index && (
                            <Autocomplete
                              id={`combo-box-demo_${index}`}
                              options={dataTaxes}
                              getOptionLabel={(option) => option.TaxCode}
                              style={{ width: 200 }}
                              onChange={handleChange}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Impuesto Correcto"
                                  variant="outlined"
                                  size="small"
                                />
                              )}
                            />
                          )}

                          <IconButton
                            color="primary"
                            aria-label={
                              mode === 'edit' && rowNumber === index
                                ? 'Guardar'
                                : 'Editar'
                            }
                            component="span"
                            onClick={() =>
                              handleEditSave({
                                index,
                                row,
                                action:
                                  mode === 'edit' && rowNumber === index
                                    ? 'Guardar'
                                    : 'Editar',
                              })
                            }
                          >
                            {mode === 'edit' ? <SaveIcon /> : <EditIcon />}
                          </IconButton>
                        </>
                      )}
                    </Grid>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaxesTable;
