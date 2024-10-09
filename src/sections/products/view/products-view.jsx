import axios from "axios";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
import TableCell, { tableCellClasses } from '@mui/material/TableCell'; // Import useNavigate

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
  const [selectedName, setSelectedName] = React.useState('');
  const [, setModalType] = useState('success'); // 'success' or 'yellow' based on the response

  const [responseText, setResponseText] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [open, setOpen] = useState(false);

  const [, setUniqueNumbers] = useState([]);
  const [serv, setServ] = useState(null);  // To store the single service object
  const [payments, setPayments] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const isMobile = useMediaQuery('(max-width:600px)');
  const [autoRenew, setAutoRenew] = useState(false); // Default to no autorenew

  const [services, setServices] = useState([]);



  const navigate = useNavigate(); // Initialize useNavigate


  const handleButtonClick = (phoneNumber) => {

    navigate(`/dedicated?number=${encodeURIComponent(phoneNumber)}`); // Use encodeURIComponent to handle special characters
  };

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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedName(value);
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



        // Filter out duplicate numbers
        const uniquePayments = response.data.data.filter(
          (payment, index, self) =>
            index === self.findIndex((p) => p.number === payment.number)
        );


        // Access the numbers from uniquePayments
        // eslint-disable-next-line no-shadow
        const uniqueNumbers = uniquePayments.map(payment => payment.number);

        console.log(uniqueNumbers); // Logs the array of unique numbers



        setUniqueNumbers(uniquePayments.map(payment => payment.number)); // Store only the unique numbers

        setPayments(uniquePayments); // Store only the unique payments

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

        };
        const responseServices = await axios.request(optionsServices);
        console.log(responseServices);
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

        params: { type: 'mdn', servicecode: selectedService, countrycode: selectedName }
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
  }, [selectedName, selectedService]);  // Empty dependency array ensures it runs only once on mount



  const handleBuy = async () => {
    try {
      let showPrice = false;

      // eslint-disable-next-line no-undef
      if (!selectedName || !selectedService) {
        alert("Please select both a country and a service before proceeding.");
        showPrice = false; // Hide the price if either is not selected
        return;
      }

      showPrice = true; // Show the price if both are selected

      // Display price based on the showPrice flag
      if (showPrice) {
        document.getElementById("price").style.display = "block"; // Show price
      } else {
        document.getElementById("price").style.display = "none"; // Hide price
      }

      const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;




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
          // eslint-disable-next-line no-undef
          countrycode: selectedName,    // Use the selected country code
          mode: 'live',
          autorenew: autoRenew         // Add autorenew based on the select value
        }
      };

      console.log(options)


      // Make the API request
      const response = await axios.request(options);

      console.log(response.data)
      // Update state with response data
      setResponseText(response.data);
      console.log(setResponseText)
      console.log(response)




      console.log(options)
      console.log(response)

      // Make the API request
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

      // Check for successful purchase and trigger a page refresh in 3 seconds
      if (response.data.message === 'Successfully purchased number') {
        setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 3000); // 3 seconds
      }




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
    .sort((a, b) => a.messagedate - b.messagedate) // Sort by date (earliest first)



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const paginatedRows = rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .reverse();




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
                      fullWidth
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
                        <MenuItem key={service.code} value={service.code} style={{ fontSize: '18px', margin: '10px 0' }}>
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
                      value={selectedName}

                      onChange={handleChange}
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

                <Box sx={{ width: '250px', maxWidth: '100%' }}>
                  <DialogContentText>Auto-Renew</DialogContentText>
                  <FormControl
                    sx={{
                      m: 1,
                      width: 500,
                      maxWidth: isMobile ? '100%' : '900px', // Full width on mobile, fixed width on desktop
                    }}
                  >
                    <InputLabel id="autorenew-label">Auto-Renew</InputLabel>
                    <Select
                      labelId="autorenew-label"
                      id="autorenew-select"
                      value={autoRenew}
                      onChange={(event) => setAutoRenew(event.target.value)} // Set state for autorenew
                      label="Auto-Renew"
                    >
                      <MenuItem value={false}>No</MenuItem> {/* Default: No autorenew */}
                      <MenuItem value>Yes</MenuItem> {/* Enable autorenew */}
                    </Select>
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

                <StyledTableCell align="left">Service</StyledTableCell>

                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>

              </TableRow>
            </TableHead>
            
            <TableBody>
              {paginatedRows.map((row, rowIndex) => ( // Add rowIndex here
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">{row.number}</StyledTableCell>

                  <StyledTableCell align="left">{row.name}</StyledTableCell>

                  <StyledTableCell align="left">{new Date(row.messagedate).toLocaleDateString()}</StyledTableCell>
                  
                  <StyledTableCell align="left">
                    <div style={{ marginBottom: '8px' }}>
                      <Button
                        onClick={() => handleButtonClick(row.number)} // Use row.number directly
                        sx={{
                          color: 'white',
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
                        title={`Open ${row.number}`} // Tooltip to indicate the action
                      >
                        Open
                        <span style={{ display: 'none' }}>
                          Open {row.number}
                        </span> {/* Hidden text for accessibility */}
                      </Button>
                    </div>
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
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      </Box>
    </Container>
  );
}