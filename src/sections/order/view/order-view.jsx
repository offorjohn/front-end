/* eslint-disable react/no-danger */
import axios from "axios";
import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { getCookie } from '../../../utils/cookie-util';
import { isValidJSON } from "../../../utils/json-validator";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.grey,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: theme.spacing(1), // Adjust the left padding if needed
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [page, setPage] = useState(0); // Start on the first page
  const [rowsPerPage, setRowsPerPage] = useState(25); // Set to 25 rows per page

  const [payments, setPayments] = useState([]);

  React.useEffect(() => {
    let token=getCookie("token").split(":")[0];
    if(isValidJSON(localStorage.getItem('loginResponse'))){
     token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
    }
  
    const fetchPayments = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://otpninja.com/api/v1/listpayments',  
          headers: {
            'X-OTPNINJA-TOKEN': token // If required, use token in custom header
          },
        };
        const response = await axios.request(options);
        if(response.data.data){
        setPayments(response.data.data);
        }
      } catch (error) { /* empty */ }
    };
    fetchPayments();
  }, []);

  // Create rows and sort them by date (latest first)
  const rows = payments
    .map((payment) => ({
      id: payment.reference, // Assuming `reference` is unique
      amount: payment.amount,
      description: payment.description,
      date: new Date(payment.paymentdate), // Convert date string to Date object
      paymentmessage: payment.paymentmessage,
    }))
    .sort((a, b) => b.date - a.date); // Sort by date (latest first)

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate rows to display based on pagination
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography
          variant="h4"
          sx={{
            position: 'relative', // Enable relative positioning
            top: '-50px', // Move the text up by 16 pixels (adjust as needed)
            order: -3,
            mt: -2,
            fontWeight: 'bold',
            fontSize: '2rem',
          }}
        >
          Order History
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <div dangerouslySetInnerHTML={{ __html: row.description }} />
                  </StyledTableCell>
                  <TableCell sx={{ color: 'black', paddingLeft: -1 }}>
                    {row.paymentmessage ? row.paymentmessage : 'Pending'}
                  </TableCell>
                  <StyledTableCell align="left">
                    {row.date.toLocaleDateString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]} // Include options for rows per page
          />
        </TableContainer>
      </Box>
    </Container>
  );
}
