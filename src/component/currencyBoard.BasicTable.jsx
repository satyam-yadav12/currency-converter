import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: "bold",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BasicTable({ latestRates, toggleValues }) {
  function createData(CurrencyName, Code, Conversion) {
    return { CurrencyName, Code, Conversion };
  }

  const rows = [
    createData(
      "United States Dollar",
      "USD",
      toggleValues ? 1 / latestRates.USD : latestRates.USD
    ),
    createData(
      "Euro",
      "EUR",
      toggleValues ? 1 / latestRates.EUR : latestRates.EUR
    ),
    createData(
      "British Pound Sterling",
      "GBP",
      toggleValues ? 1 / latestRates.GBP : latestRates.GBP
    ),
    createData(
      "Japanese Yen",
      "JPY",
      toggleValues ? 1 / latestRates.JPY : latestRates.JPY
    ),
    createData(
      "Swiss Franc",
      "CHF",
      toggleValues ? 1 / latestRates.CHF : latestRates.CHF
    ),
    createData(
      "Canadian Dollar",
      "CAD",
      toggleValues ? 1 / latestRates.CAD : latestRates.CAD
    ),
    createData(
      "Australian Dollar",
      "AUD",
      toggleValues ? 1 / latestRates.AUD : latestRates.AUD
    ),
    createData(
      "Chinese Yuan (Renminbi)",
      "CNY",
      toggleValues ? 1 / latestRates.CNY : latestRates.CNY
    ),
    createData(
      "Indian Rupee",
      "INR",
      toggleValues ? 1 / latestRates.INR : latestRates.INR
    ),
    createData(
      "Singapore Dollar",
      "SGD",
      toggleValues ? 1 / latestRates.SGD : latestRates.SGD
    ),
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 2, p: 2, mx: "auto", boxShadow: 3 }}
    >
      <Table aria-label="styled table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Currency Name</StyledTableCell>
            <StyledTableCell align="center">Currency Code</StyledTableCell>
            <StyledTableCell align="center">Conversion Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.Code}>
              <TableCell component="th" scope="row">
                {row.CurrencyName}
              </TableCell>
              <TableCell align="center">{row.Code}</TableCell>
              <TableCell align="center">{row.Conversion}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
