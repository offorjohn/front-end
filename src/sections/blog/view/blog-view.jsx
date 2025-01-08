/* eslint-disable react/no-danger */
import axios from "axios";
import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import TableContainer from '@mui/material/TableContainer';

import { getCookie } from '../../../utils/cookie-util';
import { isValidJSON } from "../../../utils/json-validator";


export default function Blog() {

  const [open, setOpen] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('');
  
  // Initialize currentPage to 1 (since MUI's Pagination is 1-based)
  const [currentPage, setCurrentPage] = useState(1);
  
  // Set initial rowsPerPage to 25
  const [rowsPerPage] = useState(25);
  
  const [payments, setPayments] = useState([]);
  
  const [amount, setAmount] = useState('');
  
  const handleChange = (event) => {
    setSelectedPaymentMode(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const paymentMoney = async () => {
    let token=getCookie("token").split(":")[0];
    if(isValidJSON(localStorage.getItem('loginResponse'))){
     token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
    }
    try {
      const options = {
        method: 'GET',
        url: `https://otpninja.com/api/v1/initpayment?amount=${amount}`,
        headers: {
          'X-OTPNINJA-TOKEN': token,
        },
      };

      const response = await axios.request(options);

      if (response.data.status) {
        const paymentLink = response.data.paymentlink;
        // Redirect the user to the payment link
        window.location.href = paymentLink;
      } else { /* empty */ }
    } catch (error) { /* empty */ }
  };

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    const fetchPayments = async () => { 
      let token=getCookie("token").split(":")[0];
      if(isValidJSON(localStorage.getItem('loginResponse'))){
       token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
      }
      if (!token) { /* empty */ }
      
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

  // Calculate the indices for slicing the rows
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        maxWidth: { xs: '100%', md: '80%', lg: '60%' },
        p: 2,
        gap: { xs: 3, md: 9 },
        mt: { xs: -3, md: -5, lg: -20 },
      }}
    >
      {/* First Box */}
      <Box
        sx={{
          p: 1,
          height: { xs: 'auto', md: 500, lg: 350 },
          minWidth: { xs: '100%', md: 500 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 1,
          bgcolor: '#f5f5f5',
          borderRadius: 2,
          flex: 1,
        }}
      >
        {/* Select Button */}
        <Box
          component="span"
          sx={{
            fontSize: { xs: '1rem', md: '0.875rem' },
            color: '#000000',
            textAlign: { xs: 'center', md: 'left' },
            width: '100%',
            mt: 2,
          }}
        >
          Enter the Amount (NGN)
        </Box>

        {/* Price Input Field */}
        <FormControl
          sx={{
            p: 0,
            m: 1,
            mt: 3,
            minWidth: { xs: '90%', md: 460 },
            maxWidth: { xs: '100%', md: 'auto' },
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-price">Enter the amount you want to add</InputLabel>
          <OutlinedInput
            id="outlined-adornment-price"
            placeholder="Enter the amount you want to add"
            label="Price"
            value={amount}
            onChange={handleAmountChange}
          />
        </FormControl>

        {/* Select Payment Mode */}
        <Box component="span" sx={{ fontSize: { xs: '1rem', md: '0.875rem' }, color: '#000000', textAlign: { xs: 'center', md: 'left' }, width: '100%' }}>
          Select Payment mode
        </Box>
        <FormControl sx={{ m: 1, minWidth: { xs: '90%', md: 460 } }}>
          <InputLabel id="demo-controlled-open-select-label">Instant</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={selectedPaymentMode}
            label="Instant"
            onChange={handleChange}
          >
            <MenuItem value="instant">Instant</MenuItem>
            {/* Add other MenuItem components as needed */}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={paymentMoney}
            sx={{
              minWidth: { xs: '90vw', md: 450 },
              mx: { xs: '5vw', md: 0 },
              backgroundColor: 'rgba(3, 105, 161)',
              boxShadow: 1,
              '&:hover': {
                backgroundColor: 'rgba(3, 105, 161)',
              },
              '&:disabled': {
                backgroundColor: 'gray',
                color: 'darkgray',
                cursor: 'default',
              },
              '&:focus': {
                outline: 'none',
                ring: 'rgba(3, 105, 161)',
                ringOffset: '2px',
              },
            }}
          >
            Add Funds
          </Button>
        </Stack>
        <Typography
          variant="h4"
          sx={{
            order: -1,
            fontWeight: 'bold',
            fontSize: '2rem',
          }}
        >
          Fund Wallet
        </Typography>
      </Box>

      {/* Second Box */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'grey',
          p: 1,
          minWidth: { xs: '100%', md: 750 },
          height: { xs: 'auto', md: 500, lg: 500 },
          mt: { md: -1, lg: 20 },
          bgcolor: 'grey',
          borderRadius: 2,
          ml: { md: '-50px' },
        }}
      >
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey' }}>
              <TableCell
                sx={{
                  backgroundColor: 'grey',
                  color: 'white',
                  textAlign: 'left',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  borderBottom: '2px solid white',
                }}
                colSpan={4}
              >
                Payments
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: 'grey' }}>
              <TableCell
                sx={{
                  backgroundColor: 'grey',
                  color: 'white',
                  borderBottom: '2px solid white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                ID
              </TableCell>

              <TableCell
                sx={{
                  backgroundColor: 'grey',
                  color: 'white',
                  borderBottom: '2px solid white',
                  fontWeight: 'bold',
                  textAlign: 'right', // Aligns the text to the right
                  paddingRight: 1, // Add padding to the right
                }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: 'grey',
                  color: 'white',
                  borderBottom: '2px solid white',
                  fontWeight: 'bold',
                  textAlign: 'left', // Aligns the text to the left
                  paddingLeft: 16, // Add padding to the left
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: 'grey',
                  color: 'white',
                  borderBottom: '2px solid white',
                  textAlign: 'left', // Aligns the text to the left
                }}
              >
                Message Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': { borderBottom: 0 },
                  borderBottom: '2px solid white', // Adds a bottom border to each row
                }}
              >
                <TableCell component="th" scope="row" sx={{ color: 'white', textAlign: 'center' }}>
                  {row.id}
                </TableCell>

                <TableCell align="right" sx={{ color: 'white', textAlign: 'right', paddingRight: 1 }}>
                  {row.amount}
                </TableCell>
              
                <TableCell sx={{ color: 'white', paddingLeft: 16 }}>
                  {row.paymentmessage ? row.paymentmessage : 'Pending'}
                </TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'left' }}>
                  {row.date.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          sx={{
            mt: 2,
            '& .MuiPaginationItem-root': {
              color: 'white',
            },
            '& .MuiPaginationItem-page.Mui-selected': {
              backgroundColor: 'white',
              color: 'grey',
            },
          }}
          count={Math.ceil(rows.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </TableContainer>
    </Box>
  );
}
