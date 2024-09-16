import axios from "axios";
import * as React from 'react';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import DialogContentText from '@mui/material/DialogContentText';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import Modal from './modal';// Import the Modal component


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
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [responseData, setResponseData] = useState(null); // State to hold the response data
  const [selectedService, setSelectedService] = useState(''); // Set the initial value
 
  const [, setModalType] = useState('success'); // 'success' or 'yellow' based on the response
  const [setRentals, setSelectedRentals] = useState('')
  const [responseText, setResponseText] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  
  const [serv, setServ] = useState(null);  // To store the single service object
  const [payments, setPayments] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const isMobile = useMediaQuery('(max-width:600px)');
  const [services, setServices] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };


  
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedService(value);
  };

  
  
  useEffect(() => {
    const fetchPayments = async () => {
      
    const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
      try {
        const options = {
          method: 'GET',
          url: 'https://otpninja.com/api/v1/listmessages?type=mdn',  
          headers: {
            'X-OTPNINJA-TOKEN': token // If required, use token in custom header
          },
        };
        const response = await axios.request(options);
        setPayments(response.data.data);
        console.log(response.data)
        console.log(options)
        console.log(response)
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchPayments();
  }, []);

  useEffect(() => {
    const fetchNames = async () => {
      
      
    const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
      try {
        const optionsServices = {
          method: 'GET',
          url: 'https://otpninja.com/api/v1/listservices?type=mdn',
          headers: {
            'X-OTPNINJA-TOKEN': token // If required, use token in custom header
          },
          withCredentials: true, // This will ensure credentials (like cookies) are sent
        };
        const responseServices = await axios.request(optionsServices);
        setServices(responseServices.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchNames();
  }, []);

  React.useEffect(() => {
    
    const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://otpninja.com/api/v1/getprice',
        headers: {
          'X-OTPNINJA-TOKEN': token // If required, use token in custom header
        },
        withCredentials: true, // This will ensure credentials (like cookies) are sent
        params: { type: 'otp', servicecode: 'tx', countrycode: '17' }
      };

      try {
        const response = await axios.request(options);
        setServ(response.data);  // Store the response data in the state
        console.log(response.data.price);  // Check the data in the console
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    // Call the fetch function once when the component mounts
    fetchData();
  }, []);  // Empty dependency array ensures it runs only once on mount


  
  const handleBuy = async () => {
    
    
    const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
    try {// Ensure this is a valid country code
      console.log('Selected Service:', selectedService); // Ensure this is a valid service code

     



      // Set up the request options using the second code snippet's structure
      const options = {
        
        method: 'POST',
        url: 'https://otpninja.com/api/v1/buynumber',
        headers: {
          'X-OTPNINJA-TOKEN': token // If required, use token in custom header
        },
        data: {
          serviceid: selectedService,  // Use the selected service code
          type: 'mdn',                 // Use 'otp' as the type
          countrycode: ''    // Use the selected country code
        }
      };
      console.log(options)
      console.log(response)

      // Make the API request
      const response = await axios.request(options);
      console.log('Purchase response:', response.data);

      // Update state with response data
      setResponseData(response.data);

      // Handle response based on message content
      if (response.data.message === 'Invalid service') {
        setResponseText('Service not available.');
      } else {
        setResponseText(JSON.stringify(response.data.message)); // Display the actual response message
        setModalType('success'); // Adjust the modal type based on success
      }

      // Show the modal
      setShowModal(true);

    } catch (error) {
      console.error('Purchase error:', error); // Log the error for debugging
      setResponseText('Purchase failed. Please try again.');
      setModalType('yellow');
      setShowModal(true);
    } finally {
      // Optionally close the dialog after a successful purchase
      handleClose();
    }
  };

  // Create rows and sort them by date (earliest first)
  const rows = payments
    .map((payment) => ({
      id: payment.reference, // Assuming `reference` is unique
      name: payment.name,
      number: payment.number,
      messagedate: new Date(payment.messagedate), // Convert date string to Date object
      message: payment.message,
    }))
    .sort((a, b) => a.messagedate - b.messagedate); // Sort by date (earliest first)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <Container>
       {/* Modal Component */}
       <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        responseText={responseText}
        modalType={responseData}
      />

      <Box sx={{ mt: 4 }}>
        <Stack
          direction={isDesktop ? 'row' : 'column'}
          alignItems={isDesktop ? 'center' : 'flex-start'}
          justifyContent="space-between"
          mb={5}
          spacing={2}
        >
          <Typography
            variant="h4"
            sx={{

              order: -1,
              fontWeight: 'bold',
              fontSize: '2rem',
            }}
          >
            Rentals
          </Typography>

          <Button variant="contained" onClick={handleClickOpen} sx={{

            fontSize: isDesktop ? '1rem' : '0.75rem',
            padding: isDesktop ? '8px 16px' : '6px 12px',

            backgroundColor: 'rgba(3, 105, 161)'
          }}>
            Purchase New Rentals
          </Button>
        </Stack>

        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>Rental Number</DialogTitle>
          <DialogContent>
            <Stack direction="column" spacing={2} alignItems="flex-start">

              <Stack
                direction="column"
                spacing={2}
                alignItems={isMobile ? 'stretch' : 'flex-start'}
                sx={{ width: '100%' }}
              >

                <Box sx={{ width: '250px', maxWidth: '100%' }}>
                  <DialogContentText>Service</DialogContentText>

                  <FormControl
                    sx={{
                      m: 1,
                      width: 500,
                      maxWidth: isMobile ? '100%' : '900px', // Full width on mobile, fixed width on desktop
                    }}
                  >
                    <InputLabel id="service-label">Service Name</InputLabel>
                    <Select
                      labelId="service-label"
                      
                      id="service-select"
                      value={selectedService} 
                       onChange={handleChanges}
                      label="Service Name"
                      MenuProps={{
                        PaperProps: {
                          style: { // Adjust this if needed
                            width: 400,     // Set the desired width for the dropdown menu
                          },
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em style={{ fontSize: '18px' }}>Services</em>
                      </MenuItem>
                      {services.map((service) => (
                        <MenuItem key={service.name} value={service.name}>
                          {service.name}
                        </MenuItem>
                      ))}
                    </Select>

                  </FormControl>
                </Box>

                <Box sx={{ width: '250px', maxWidth: '100%' }}>
                  <DialogContentText>Durations</DialogContentText>

                  <FormControl
                    sx={{
                      m: 1,
                      width: 500,
                      maxWidth: isMobile ? '100%' : '900px', // Full width on mobile, fixed width on desktop
                    }}
                  >
                    <InputLabel id="service-label">Duration</InputLabel>
                    <Select
                      labelId="service-label"
                      id="service-select"
                      value={setRentals}
                  
                       onChange={(e) => setSelectedRentals(e.target.value)} // Call handleChange on select change
                      label="Service Name"
                    >
                      <MenuItem value="30-days-rentals">
                        <em>30 Days Rentals</em>
                      </MenuItem>
                    </Select>


                  </FormControl>
                </Box> 

                <Box sx={{ width: '250px', maxWidth: '100%' }}>
                <DialogContentText>Prices</DialogContentText>
                  <FormControl
                   
                  >
                    <InputLabel id="price" />

                    {/* Use Typography instead of Select to display the price */}
                    <Box
                     
                    >
                      {/* Show "Please select a service" when no service is selected */}
                      {!selectedService ? (
                        <Typography
                        style={{ marginTop: '20px' }}
                        >
                          Please select a service
                        </Typography>
                      ) : (
                        <Typography
                          
                        >
                          {serv.name} ✔ N{serv.price} {/* Display the service name and price */}
                        </Typography>
                      )}
                    </Box>
                  </FormControl>
                </Box>

              </Stack>
              
              {/* Text Above Amount Section */}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleBuy}>Buy</Button>

              </DialogActions>

            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: 'white', backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Number</StyledTableCell>
                <StyledTableCell align="left">Message</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">{row.number}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.message.split(' ').map((word, index) => (
                      <React.Fragment key={index}>
                        {word}{(index + 1) % 10 === 0 ? <br /> : ' '}
                      </React.Fragment>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.messagedate.toLocaleDateString()}</StyledTableCell>
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
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      </Box>
    </Container>
  );
}